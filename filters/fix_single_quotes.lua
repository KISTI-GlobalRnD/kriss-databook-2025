-- Fix Pandoc smart-quote edge cases for Korean spacing.
--
-- Pandoc's smart quote heuristics can emit a closing quote (’) where an opening
-- quote (‘) was intended when the closing quote is directly followed by Hangul
-- particles without a space (e.g., ‘용어’이다). This filter normalises cases
-- where a right single quote appears at the start of a word after whitespace or
-- at the beginning of an inline list.

local RIGHT = "’" -- U+2019
local LEFT = "‘" -- U+2018

local function should_fix(text)
  -- Convert only when the quote is used as an opening mark (followed by a word).
  -- Avoid leading apostrophes for years like ’98 by excluding digits.
  return text:match("^" .. RIGHT .. "[A-Za-z_가-힣]")
end

local function fix_inlines(inlines)
  for i, inline in ipairs(inlines) do
    if inline.t == "Str" then
      local prev = inlines[i - 1]
      local prev_is_space = (i == 1)
        or (prev and (prev.t == "Space" or prev.t == "SoftBreak" or prev.t == "LineBreak"))

      if prev_is_space and should_fix(inline.text) then
        inline.text = inline.text:gsub("^" .. RIGHT, LEFT, 1)
      end
    end
  end
  return inlines
end

function Para(el)
  el.content = fix_inlines(el.content)
  return el
end

function Plain(el)
  el.content = fix_inlines(el.content)
  return el
end

function Header(el)
  el.content = fix_inlines(el.content)
  return el
end

function Inlines(inlines)
  return fix_inlines(inlines)
end
