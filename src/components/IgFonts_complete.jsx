import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import useAccordion from './useAccordion';
import './IgFonts.css';
import './IgFontsArticle.css';

// Fancy text generator functions
const generateFancyText = (text) => {
  const styles = [
    { name: "Bold", transform: (char) => {
      const boldMap = {
        'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦',
        'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
        'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
        '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
      };
      return boldMap[char] || char;
    }},
    { name: "Italic", transform: (char) => {
      const italicMap = {
        'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚',
        'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
        'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀',
        'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍'
      };
      return italicMap[char] || char;
    }},
    { name: "Bold Italic", transform: (char) => {
      const boldItalicMap = {
        'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆', 'f': '𝒇', 'g': '𝒈', 'h': '𝒉', 'i': '𝒊', 'j': '𝒋', 'k': '𝒌', 'l': '𝒍', 'm': '𝒎',
        'n': '𝒏', 'o': '𝒐', 'p': '𝒑', 'q': '𝒒', 'r': '𝒓', 's': '𝒔', 't': '𝒕', 'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙', 'y': '𝒚', 'z': '𝒛',
        'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱', 'K': '𝑲', 'L': '𝑳', 'M': '𝑴',
        'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻', 'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁'
      };
      return boldItalicMap[char] || char;
    }},
    { name: "Script", transform: (char) => {
      const scriptMap = {
        'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': 'ℊ', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂',
        'n': '𝓃', 'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
        'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ',
        'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵'
      };
      return scriptMap[char] || char;
    }},
    { name: "Bold Script", transform: (char) => {
      const boldScriptMap = {
        'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶',
        'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃',
        'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗', 'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜',
        'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩'
      };
      return boldScriptMap[char] || char;
    }},
    { name: "Fraktur", transform: (char) => {
      const frakturMap = {
        'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣', 'g': '𝔤', 'h': '𝔥', 'i': '𝔦', 'j': '𝔧', 'k': '𝔨', 'l': '𝔩', 'm': '𝔪',
        'n': '𝔫', 'o': '𝔬', 'p': '𝔭', 'q': '𝔮', 'r': '𝔯', 's': '𝔰', 't': '𝔱', 'u': '𝔲', 'v': '𝔳', 'w': '𝔴', 'x': '𝔵', 'y': '𝔶', 'z': '𝔷',
        'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ', 'I': 'ℑ', 'J': '𝔍', 'K': '𝔎', 'L': '𝔏', 'M': '𝔐',
        'N': '𝔑', 'O': '𝔒', 'P': '𝔓', 'Q': '𝔔', 'R': 'ℜ', 'S': '𝔖', 'T': '𝔗', 'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛', 'Y': '𝔜', 'Z': 'ℨ'
      };
      return frakturMap[char] || char;
    }},
    { name: "Double Struck", transform: (char) => {
      const doubleStruckMap = {
        'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞',
        'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
        'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄',
        'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ',
        '0': '𝟘', '1': '𝟙', '2': '𝟚', '3': '𝟛', '4': '𝟜', '5': '𝟝', '6': '𝟞', '7': '𝟟', '8': '𝟠', '9': '𝟡'
      };
      return doubleStruckMap[char] || char;
    }},
    { name: "Monospace", transform: (char) => {
      const monospaceMap = {
        'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖',
        'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣',
        'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹', 'K': '𝙺', 'L': '𝙻', 'M': '𝙼',
        'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉',
        '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
      };
      return monospaceMap[char] || char;
    }},
    { name: "Circled", transform: (char) => {
      const circledMap = {
        'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ',
        'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
        'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ',
        'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ',
        '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨'
      };
      return circledMap[char] || char;
    }},
    { name: "Negative Circled", transform: (char) => {
      const negativeCircledMap = {
        'a': '🅐', 'b': '🅑', 'c': '🅒', 'd': '🅓', 'e': '🅔', 'f': '🅕', 'g': '🅖', 'h': '🅗', 'i': '🅘', 'j': '🅙', 'k': '🅚', 'l': '🅛', 'm': '🅜',
        'n': '🅝', 'o': '🅞', 'p': '🅟', 'q': '🅠', 'r': '🅡', 's': '🅢', 't': '🅣', 'u': '🅤', 'v': '🅥', 'w': '🅦', 'x': '🅧', 'y': '🅨', 'z': '🅩',
        'A': '🅐', 'B': '🅑', 'C': '🅒', 'D': '🅓', 'E': '🅔', 'F': '🅕', 'G': '🅖', 'H': '🅗', 'I': '🅘', 'J': '🅙', 'K': '🅚', 'L': '🅛', 'M': '🅜',
        'N': '🅝', 'O': '🅞', 'P': '🅟', 'Q': '🅠', 'R': '🅡', 'S': '🅢', 'T': '🅣', 'U': '🅤', 'V': '🅥', 'W': '🅦', 'X': '🅧', 'Y': '🅨', 'Z': '🅩',
        '0': '⓿', '1': '❶', '2': '❷', '3': '❸', '4': '❹', '5': '❺', '6': '❻', '7': '❼', '8': '❽', '9': '❾'
      };
      return negativeCircledMap[char] || char;
    }},
    { name: "Parenthesized", transform: (char) => {
      const parenthesizedMap = {
        'a': '⒜', 'b': '⒝', 'c': '⒞', 'd': '⒟', 'e': '⒠', 'f': '⒡', 'g': '⒢', 'h': '⒣', 'i': '⒤', 'j': '⒥', 'k': '⒦', 'l': '⒧', 'm': '⒨',
        'n': '⒩', 'o': '⒪', 'p': '⒫', 'q': '⒬', 'r': '⒭', 's': '⒮', 't': '⒯', 'u': '⒰', 'v': '⒱', 'w': '⒲', 'x': '⒳', 'y': '⒴', 'z': '⒵',
        'A': '⒜', 'B': '⒝', 'C': '⒞', 'D': '⒟', 'E': '⒠', 'F': '⒡', 'G': '⒢', 'H': '⒣', 'I': '⒤', 'J': '⒥', 'K': '⒦', 'L': '⒧', 'M': '⒨',
        'N': '⒩', 'O': '⒪', 'P': '⒫', 'Q': '⒬', 'R': '⒭', 'S': '⒮', 'T': '⒯', 'U': '⒰', 'V': '⒱', 'W': '⒲', 'X': '⒳', 'Y': '⒴', 'Z': '⒵',
        '0': '⒪', '1': '⑴', '2': '⑵', '3': '⑶', '4': '⑷', '5': '⑸', '6': '⑹', '7': '⑺', '8': '⑻', '9': '⑼'
      };
      return parenthesizedMap[char] || char;
    }},
    { name: "Regional Indicator", transform: (char) => {
      const regionalIndicatorMap = {
        'a': '🇦', 'b': '🇧', 'c': '🇨', 'd': '🇩', 'e': '🇪', 'f': '🇫', 'g': '🇬', 'h': '🇭', 'i': '🇮', 'j': '🇯', 'k': '🇰', 'l': '🇱', 'm': '🇲',
        'n': '🇳', 'o': '🇴', 'p': '🇵', 'q': '🇶', 'r': '🇷', 's': '🇸', 't': '🇹', 'u': '🇺', 'v': '🇻', 'w': '🇼', 'x': '🇽', 'y': '🇾', 'z': '🇿',
        'A': '🇦', 'B': '🇧', 'C': '🇨', 'D': '🇩', 'E': '🇪', 'F': '🇫', 'G': '🇬', 'H': '🇭', 'I': '🇮', 'J': '🇯', 'K': '🇰', 'L': '🇱', 'M': '🇲',
        'N': '🇳', 'O': '🇴', 'P': '🇵', 'Q': '🇶', 'R': '🇷', 'S': '🇸', 'T': '🇹', 'U': '🇺', 'V': '🇻', 'W': '🇼', 'X': '🇽', 'Y': '🇾', 'Z': '🇿'
      };
      return regionalIndicatorMap[char] || char;
    }},
    { name: "Squared", transform: (char) => {
      const squaredMap = {
        'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶', 'h': '🄷', 'i': '🄸', 'j': '🄹', 'k': '🄺', 'l': '🄻', 'm': '🄼',
        'n': '🄽', 'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃', 'u': '🅄', 'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅈', 'z': '🅉',
        'A': '🄰', 'B': '🄱', 'C': '🄲', 'D': '🄳', 'E': '🄴', 'F': '🄵', 'G': '🄶', 'H': '🄷', 'I': '🄸', 'J': '🄹', 'K': '🄺', 'L': '🄻', 'M': '🄼',
        'N': '🄽', 'O': '🄾', 'P': '🄿', 'Q': '🅀', 'R': '🅁', 'S': '🅂', 'T': '🅃', 'U': '🅄', 'V': '🅅', 'W': '🅆', 'X': '🅇', 'Y': '🅈', 'Z': '🅉',
        '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣', '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣', '9': '9️⃣'
      };
      return squaredMap[char] || char;
    }},
    { name: "Negative Squared", transform: (char) => {
      const negativeSquaredMap = {
        'a': '🅰', 'b': '🅱', 'c': '🅲', 'd': '🅳', 'e': '🅴', 'f': '🅵', 'g': '🅶', 'h': '🅷', 'i': '🅸', 'j': '🅹', 'k': '🅺', 'l': '🅻', 'm': '🅼',
        'n': '🅽', 'o': '🅾', 'p': '🅿', 'q': '🆀', 'r': '🆁', 's': '🆂', 't': '🆃', 'u': '🆄', 'v': '🆅', 'w': '🆆', 'x': '🆇', 'y': '🆈', 'z': '🆉',
        'A': '🅰', 'B': '🅱', 'C': '🅲', 'D': '🅳', 'E': '🅴', 'F': '🅵', 'G': '🅶', 'H': '🅷', 'I': '🅸', 'J': '🅹', 'K': '🅺', 'L': '🅻', 'M': '🅼',
        'N': '🅽', 'O': '🅾', 'P': '🅿', 'Q': '🆀', 'R': '🆁', 'S': '🆂', 'T': '🆃', 'U': '🆄', 'V': '🆅', 'W': '🆆', 'X': '🆇', 'Y': '🆈', 'Z': '🆉'
      };
      return negativeSquaredMap[char] || char;
    }},
    { name: "Mathematical Bold Fraktur", transform: (char) => {
      const mathBoldFrakturMap = {
        'a': '𝖆', 'b': '𝖇', 'c': '𝖈', 'd': '𝖉', 'e': '𝖊', 'f': '𝖋', 'g': '𝖌', 'h': '𝖍', 'i': '𝖎', 'j': '𝖏', 'k': '𝖐', 'l': '𝖑', 'm': '𝖒',
        'n': '𝖓', 'o': '𝖔', 'p': '𝖕', 'q': '𝖖', 'r': '𝖗', 's': '𝖘', 't': '𝖙', 'u': '𝖚', 'v': '𝖛', 'w': '𝖜', 'x': '𝖝', 'y': '𝖞', 'z': '𝖟',
        'A': '𝕬', 'B': '𝕭', 'C': '𝕮', 'D': '𝕯', 'E': '𝕰', 'F': '𝕱', 'G': '𝕲', 'H': '𝕳', 'I': '𝕴', 'J': '𝕵', 'K': '𝕶', 'L': '𝕷', 'M': '𝕸',
        'N': '𝕹', 'O': '𝕺', 'P': '𝕻', 'Q': '𝕼', 'R': '𝕽', 'S': '𝕾', 'T': '𝕿', 'U': '𝖀', 'V': '𝖁', 'W': '𝖂', 'X': '𝖃', 'Y': '𝖄', 'Z': '𝖅'
      };
      return mathBoldFrakturMap[char] || char;
    }},
    { name: "Mathematical Sans-Serif Bold", transform: (char) => {
      const mathSansSerifBoldMap = {
        'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺',
        'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
        'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠',
        'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
        '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
      };
      return mathSansSerifBoldMap[char] || char;
    }},
    // Additional font styles from instagrambiofonts.com
    { name: "Bricks Style 1", transform: (char) => {
      const bricks1Map = {
        'a': 'α', 'b': 'в', 'c': '¢', 'd': '∂', 'e': 'є', 'f': 'ƒ', 'g': 'g', 'h': 'н', 'i': 'ι', 'j': 'נ', 'k': 'к', 'l': 'ℓ', 'm': 'м',
        'n': 'η', 'o': 'σ', 'p': 'ρ', 'q': 'q', 'r': 'я', 's': 'ѕ', 't': 'т', 'u': 'υ', 'v': 'ν', 'w': 'ω', 'x': 'χ', 'y': 'ψ', 'z': 'z',
        'A': 'α', 'B': 'ב', 'C': '¢', 'D': '∂', 'E': 'є', 'F': 'ƒ', 'G': 'g', 'H': 'н', 'I': 'ι', 'J': 'נ', 'K': 'к', 'L': 'ℓ', 'M': 'м',
        'N': 'η', 'O': 'σ', 'P': 'ρ', 'Q': 'q', 'R': 'я', 'S': 'ѕ', 'T': 'т', 'U': 'υ', 'V': 'ν', 'W': 'ω', 'X': 'χ', 'Y': 'ψ', 'Z': 'z',
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
      };
      return bricks1Map[char] || char;
    }},
    { name: "Bricks Style 2", transform: (char) => {
      const bricks2Map = {
        'a': 'ค', 'b': '๖', 'c': '¢', 'd': '໓', 'e': 'ē', 'f': 'f', 'g': 'ງ', 'h': 'h', 'i': 'i', 'j': 'ว', 'k': 'k', 'l': 'l', 'm': '๓',
        'n': 'ຖ', 'o': '໐', 'p': 'p', 'q': 'q', 'r': 'r', 's': 'Ş', 't': 't', 'u': 'น', 'v': 'ง', 'w': 'ຟ', 'x': 'x', 'y': 'ฯ', 'z': 'ຊ',
        'A': 'ค', 'B': '๖', 'C': '¢', 'D': '໓', 'E': 'ē', 'F': 'f', 'G': 'ງ', 'H': 'h', 'I': 'i', 'J': 'ว', 'K': 'k', 'L': 'l', 'M': '๓',
        'N': 'ຖ', 'O': '໐', 'P': 'p', 'Q': 'q', 'R': 'r', 'S': 'Ş', 'T': 't', 'U': 'น', 'V': 'ง', 'W': 'ຟ', 'X': 'x', 'Y': 'ฯ', 'Z': 'ຊ',
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
      };
      return bricks2Map[char] || char;
    }},
    { name: "Gun Style", transform: (char) => {
      const gunMap = {
        'a': 'ค', 'b': '๖', 'c': 'ƈ', 'd': 'ɗ', 'e': 'ε', 'f': 'ƒ', 'g': 'ɠ', 'h': 'ɦ', 'i': 'ι', 'j': 'ʝ', 'k': 'ƙ', 'l': 'ℓ', 'm': 'ɱ',
        'n': 'ŋ', 'o': 'ơ', 'p': '℘', 'q': 'զ', 'r': 'ཞ', 's': 'ʂ', 't': 'ƚ', 'u': 'υ', 'v': '۷', 'w': 'ῳ', 'x': 'ﾒ', 'y': 'ƴ', 'z': 'ʑ',
        'A': 'ค', 'B': '๖', 'C': 'ƈ', 'D': 'ɗ', 'E': 'ε', 'F': 'ƒ', 'G': 'ɠ', 'H': 'ɦ', 'I': 'ι', 'J': 'ʝ', 'K': 'ƙ', 'L': 'ℓ', 'M': 'ɱ',
        'N': 'ŋ', 'O': 'ơ', 'P': '℘', 'Q': 'զ', 'R': 'ཞ', 'S': 'ʂ', 'T': 'ƚ', 'U': 'υ', 'V': '۷', 'W': 'ῳ', 'X': 'ﾒ', 'Y': 'ƴ', 'Z': 'ʑ',
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
      };
      return gunMap[char] || char;
    }},
    { name: "Cute Style", transform: (char) => {
      const cuteMap = {
        'a': 'α', 'b': 'в', 'c': '¢', 'd': 'đ', 'e': 'є', 'f': 'ƒ', 'g': 'g', 'h': 'ħ', 'i': 'ι', 'j': 'j', 'k': 'к', 'l': 'ł', 'm': 'м',
        'n': 'и', 'o': 'σ', 'p': 'ρ', 'q': 'q', 'r': 'я', 's': 'š', 't': 'т', 'u': 'υ', 'v': 'ν', 'w': 'ω', 'x': 'χ', 'y': 'у', 'z': 'ž',
        'A': 'α', 'B': 'в', 'C': '¢', 'D': 'đ', 'E': 'є', 'F': 'ƒ', 'G': 'g', 'H': 'ħ', 'I': 'ι', 'J': 'j', 'K': 'к', 'L': 'ł', 'M': 'м',
        'N': 'и', 'O': 'σ', 'P': 'ρ', 'Q': 'q', 'R': 'я', 'S': 'š', 'T': 'т', 'U': 'υ', 'V': 'ν', 'W': 'ω', 'X': 'χ', 'Y': 'у', 'Z': 'ž',
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
      };
      return cuteMap[char] || char;
    }},
    { name: "Spiritual Style", transform: (char) => {
      const spiritualMap = {
        'a': 'α', 'b': 'β', 'c': 'ƈ', 'd': 'ԃ', 'e': 'ε', 'f': 'ƒ', 'g': 'ɠ', 'h': 'ɦ', 'i': 'ι', 'j': 'ʝ', 'k': 'ƙ', 'l': 'ł', 'm': 'ɱ',
        'n': 'ɳ', 'o': 'σ', 'p': 'ρ', 'q': 'ϙ', 'r': 'ɾ', 's': 'ʂ', 't': 'ƚ', 'u': 'υ', 'v': 'ʋ', 'w': 'ɯ', 'x': 'x', 'y': 'ყ', 'z': 'ȥ',
        'A': 'α', 'B': 'β', 'C': 'ƈ', 'D': 'ԃ', 'E': 'ε', 'F': 'ƒ', 'G': 'ɠ', 'H': 'ɦ', 'I': 'ι', 'J': 'ʝ', 'K': 'ƙ', 'L': 'ł', 'M': 'ɱ',
        'N': 'ɳ', 'O': 'σ', 'P': 'ρ', 'Q': 'ϙ', 'R': 'ɾ', 'S': 'ʂ', 'T': 'ƚ', 'U': 'υ', 'V': 'ʋ', 'W': 'ɯ', 'X': 'x', 'Y': 'ყ', 'Z': 'ȥ',
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
      };
      return spiritualMap[char] || char;
    }},
    { name: "Gym Style", transform: (char) => {
      const gymMap = {
        'a': 'ǟ', 'b': 'ɮ', 'c': 'ƈ', 'd': 'ɖ', 'e': 'ɛ', 'f': 'ʄ', 'g': 'ɢ', 'h': 'ɦ', 'i': 'ɨ', 'j': 'ʝ', 'k': 'ӄ', 'l': 'ʟ', 'm': 'ʍ',
        'n': 'ռ', 'o': 'օ', 'p': 'ք', 'q': 'զ', 'r': 'ʀ', 's': 'ֆ', 't': 'ȶ', 'u': 'ʊ', 'v': 'ʋ', 'w': 'ա', 'x': 'ӿ', 'y': 'ʏ', 'z': 'ʐ',
        'A': 'ǟ', 'B': 'ɮ', 'C': 'ƈ', 'D': 'ɖ', 'E': 'ɛ', 'F': 'ʄ', 'G': 'ɢ', 'H': 'ɦ', 'I': 'ɨ', 'J': 'ʝ', 'K': 'ӄ', 'L': 'ʟ', 'M': 'ʍ',
        'N': 'ռ', 'O': 'օ', 'P': 'ք', 'Q': 'զ', 'R': 'ʀ', 'S': 'ֆ', 'T': 'ȶ', 'U': 'ʊ', 'V': 'ʋ', 'W': 'ա', 'X': 'ӿ', 'Y': 'ʏ', 'Z': 'ʐ',
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
      };
      return gymMap[char] || char;
    }},
    { name: "Hot Style", transform: (char) => {
      const hotMap = {
        'a': 'ค', 'b': '๖', 'c': 'ƈ', 'd': 'ɗ', 'e': 'ε', 'f': 'ƒ', 'g': 'ɠ', 'h': 'ɦ', 'i': 'ι', 'j': 'ʝ', 'k': 'ƙ', 'l': 'ℓ', 'm': 'ɱ',
        'n': 'ɳ', 'o': 'ơ', 'p': '℘', 'q': 'զ', 'r': 'ཞ', 's': 'ʂ', 't': 'ƚ', 'u': 'υ', 'v': 'ν', 'w': 'ɯ', 'x': 'ջ', 'y': 'ყ', 'z': 'z',
        'A': 'ค', 'B': '๖', 'C': 'ƈ', 'D': 'ɗ', 'E': 'ε', 'F': 'ƒ', 'G': 'ɠ', 'H': 'ɦ', 'I': 'ι', 'J': 'ʝ', 'K': 'ƙ', 'L': 'ℓ', 'M': 'ɱ',
        'N': 'ɳ', 'O': 'ơ', 'P': '℘', 'Q': 'զ', 'R': 'ཞ', 'S': 'ʂ', 'T': 'ƚ', 'U': 'υ', 'V': 'ν', 'W': 'ɯ', 'X': 'ջ', 'Y': 'ყ', 'Z': 'z',
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
      };
      return hotMap[char] || char;
    }},
    { name: "Attitude Style", transform: (char) => {
      const attitudeMap = {
        'a': 'å', 'b': 'ß', 'c': '¢', 'd': 'đ', 'e': 'ê', 'f': 'ƒ', 'g': 'ǥ', 'h': 'ħ', 'i': 'í', 'j': 'j', 'k': 'ķ', 'l': 'ł', 'm': 'ɱ',
        'n': 'ñ', 'o': 'ö', 'p': 'þ', 'q': 'q', 'r': 'ŕ', 's': 'š', 't': 'ŧ', 'u': 'ü', 'v': 'v', 'w': 'ẅ', 'x': 'x', 'y': 'ý', 'z': 'ž',
        'A': 'å', 'B': 'ß', 'C': '¢', 'D': 'đ', 'E': 'ê', 'F': 'ƒ', 'G': 'ǥ', 'H': 'ħ', 'I': 'í', 'J': 'j', 'K': 'ķ', 'L': 'ł', 'M': 'ɱ',
        'N': 'ñ', 'O': 'ö', 'P': 'þ', 'Q': 'q', 'R': 'ŕ', 'S': 'š', 'T': 'ŧ', 'U': 'ü', 'V': 'v', 'W': 'ẅ', 'X': 'x', 'Y': 'ý', 'Z': 'ž',
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
      };
      return attitudeMap[char] || char;
    }}
  ];

  // Emoji combinations for Instagram-style text
  const emojiCombinations = [
    { name: "Flower Power", prefix: "🌸", suffix: "🌸" },
    { name: "Heartfelt", prefix: "💖", suffix: "💖" },
    { name: "Fire Style", prefix: "🔥", suffix: "🔥" },
    { name: "Smiley Vibes", prefix: "😊", suffix: "😊" },
    { name: "Thumbs Up", prefix: "👍", suffix: "👍" },
    { name: "Broken Heart", prefix: "💔", suffix: "💔" },
    { name: "Poop Humor", prefix: "💩", suffix: "💩" },
    { name: "Star Power", prefix: "⭐", suffix: "⭐" },
    { name: "Diamond Style", prefix: "💎", suffix: "💎" },
    { name: "Crown Royal", prefix: "👑", suffix: "👑" },
    { name: "Unicorn Magic", prefix: "🦄", suffix: "🦄" },
    { name: "Rainbow Bright", prefix: "🌈", suffix: "🌈" },
    { name: "Sparkle Effect", prefix: "✨", suffix: "✨" },
    { name: "Rose Romance", prefix: "🌹", suffix: "🌹" },
    { name: "Sunshine", prefix: "☀️", suffix: "☀️" },
    { name: "Moonlight", prefix: "🌙", suffix: "🌙" },
    { name: "Lightning", prefix: "⚡", suffix: "⚡" },
    { name: "Skull Gang", prefix: "💀", suffix: "💀" },
    { name: "Ghostly", prefix: "👻", suffix: "👻" },
    { name: "Angel Wings", prefix: "👼", suffix: "👼" }
  ];

  // Generate font styles
  const fontResults = styles.map(style => {
    const transformedText = text.split('').map(char => style.transform(char)).join('');
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: style.name,
      text: transformedText
    };
  });

  // Generate emoji combinations
  const emojiResults = emojiCombinations.map((combo, index) => {
    // Apply a random font style to the text for variety
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const styledText = text.split('').map(char => randomStyle.transform(char)).join('');
    
    return {
      id: `emoji-${index}`,
      name: combo.name,
      text: `${combo.prefix} ${styledText} ${combo.suffix}`
    };
  });

  // Combine both results
  return [...fontResults, ...emojiResults];
};

const IgFonts = () => {
  const [inputText, setInputText] = useState('');
  const [copiedText, setCopiedText] = useState(null);
  const [flippedCards, setFlippedCards] = useState(Array(3).fill(false)); // Initialize with 3 false values for 3 sample cards
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();
  const { openItems, toggleItem } = useAccordion();
  
  // Function to toggle flip state for a card
  const toggleFlip = (index) => {
    setFlippedCards(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };
  
  const handleSampleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleGenerate = () => {
    if (inputText.trim()) {
      // Navigate to the results page with the input text as state
      navigate('/results', { state: { inputText } });
    }
  };

  // Sample bio data for the flip cards
  const sampleBios = [
    {
      front: `🌟 Living my best life 🌟
💫 Dreamer | Believer | Achiever
👉 Tap to follow my journey!`,
      back: `🌟 Living my best life 🌟
💫 Dreamer | Believer | Achiever
👉 Tap to follow my journey!`
    },
    {
      front: `🔥 CEO of my own life 🔥
🚀 Entrepreneur | Innovator | Leader
💼 Building dreams into reality`,
      back: `🔥 CEO of my own life 🔥
🚀 Entrepreneur | Innovator | Leader
💼 Building dreams into reality`
    },
    {
      front: `🎨 Creative soul on a mission
✨ Spreading positivity & good vibes
📸 Capturing life's beautiful moments`,
      back: `🎨 Creative soul on a mission
✨ Spreading positivity & good vibes
📸 Capturing life's beautiful moments`
    }
  ];

  // Sample font data for the font cards
  const sampleFonts = [
    {
      text: `🌟 Living my best life 🌟
💫 Dreamer | Believer | Achiever
👉 Tap to follow my journey!`,
      style: "𝓕𝓸𝓷𝓽 𝓮𝔁𝓪𝓶𝓹𝓵𝓮 𝓸𝓷𝓮"
    },
    {
      text: `🌟 Living my best life 🌟
💫 Dreamer | Believer | Achiever
👉 Tap to follow my journey!`,
      style: "ⓕⓞⓝⓣ ⓔⓧⓐⓜⓟⓛⓔ ⓣⓦⓞ"
    },
    {
      text: `🌟 Living my best life 🌟
💫 Dreamer | Believer | Achiever
👉 Tap to follow my journey!`,
      style: "🅵🅾🅽🆃 🅴🆇🅰🅼🅿🅻🅴 🆃🅷🆁🅴🅴"
    },
    {
      text: `🌟 🅻🅸🆅🅸🅽🅶 🅼🆈 🅱🅴🆂🆃 🅻🅸🅵🅴 🌟
      
💫 🅳🆁🅴🅰🅼🅴🆁 | 🅱🅴🅻🅸🅴🆅🅴🆁 | 🅰🅲🅷🅸🅴🆅🅴🆁

👉 🆃🅰🅿 🆃🅾 🅵🅾🅻🅻🅾🆆 🅼🆈 🅹🅾🆄🆁🅽🅴🆈!`,
      style: "🆂🅰🅼🅿🅻🅴 🅾🅽🅴"
    },
    {
      text: `🌟 łívíñǥ ɱý ßêšŧ łíƒê 🌟

💫 đŕêåɱêŕ | ßêłíêvêŕ | å¢ħíêvêŕ

👉 ŧåþ ŧö ƒöłłöẅ ɱý jöüŕñêý!`,
      style: "🆂🅰🅼🅿🅻🅴 🆃🆆🅾"
    },
    {
      text: `🌟 ℒ𝒾𝓋𝒾𝓃ℊ 𝓂𝓎 𝒷ℯ𝓈𝓉 𝓁𝒾𝒻ℯ 🌟
💫 𝒟𝓇ℯ𝒶𝓂ℯ𝓇 | ℬℯ𝓁𝒾ℯ𝓿ℯ𝓇 | 𝒜𝒸𝒽𝒾ℯ𝓿ℯ𝓇
👉 𝒯𝒶𝓅 𝓉ℴ 𝒻ℴ𝓁𝓁ℴ𝓌 𝓂𝓎 𝒿ℴ𝓊𝓇𝓃ℯ𝓎!`,
      style: "🆂🅰🅼🅿🅻🅴 🆃🅷🆁🅴🅴"
    }
  ];

  // Popular fonts data
  const popularFonts = [
    {
      text: `✨ Creative Soul ✨
🌟 Dreamer & Believer
💫 Making Magic Happen`,
      style: "✨ Creative Soul ✨"
    },
    {
      text: `🔥 CEO of My Life 🔥
🚀 Entrepreneur & Innovator
💼 Building Dreams`,
      style: "🔥 CEO of My Life 🔥"
    },
    {
      text: `🌟 Living My Best Life 🌟
💫 Dreamer | Believer | Achiever
👉 Follow My Journey`,
      style: "🌟 Living My Best Life 🌟"
    },
    {
      text: `🎨 Artist & Creator 🎨
✨ Spreading Good Vibes
📸 Capturing Beautiful Moments`,
      style: "🎨 Artist & Creator 🎨"
    }
  ];

  return (
    <div className={`ig-fonts-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      {/* IG Fonts Generator Widget */}
      <div className="ig-fonts-generator-widget">
        <div className="ig-fonts-header">
          <h2>IG Fonts Generator</h2>
          <p>Enter your text below (up to 220 characters) to generate 100+ different font styles for your Instagram bio</p>
        </div>
        
        <div className="ig-fonts-input-section">
          <textarea
            className="ig-fonts-textarea"
            placeholder="Enter your text here (up to 220 characters)"
            value={inputText}
            onChange={(e) => setInputText(e.target.value.slice(0, 220))}
            maxLength={220}
          />
          <div className="ig-fonts-input-info">
            <span>{inputText.length}/220 characters</span>
          </div>
          <button 
            className="ig-fonts-generate-btn"
            onClick={handleGenerate}
            disabled={!inputText.trim()}
          >
            Generate Fonts
          </button>
        </div>
      </div>

      {/* SEO Content Widget */}
      <div className="ig-fonts-seo-widget">
        {/* SEO Article Content */}
        <article className="ig-fonts-article">
          <h2>Transform Your Instagram Presence with Unique Fonts</h2>
          
          <p>In today's digital landscape, standing out on social media is more important than ever. Your Instagram bio is often the first impression people have of you or your brand, making it crucial to make it memorable and unique. Our Instagram font generator tool helps you create eye-catching text that will make your profile stand out from the crowd.</p>
          
          <h3>Why Use Instagram Fonts and Font Generators?</h3>
          
          <p>Instagram fonts and font generators have become essential tools for anyone looking to enhance their social media presence. Here's why:</p>
          
          <ul>
            <li><strong>Unique Personal Branding:</strong> Custom fonts help you express your personality and create a distinctive brand identity</li>
            <li><strong>Increased Engagement:</strong> Eye-catching text draws more attention to your profile and posts</li>
            <li><strong>Professional Appearance:</strong> Well-designed fonts give your profile a polished, professional look</li>
            <li><strong>Better Readability:</strong> Creative fonts can make your bio more engaging and easier to read</li>
            <li><strong>Stand Out:</strong> Unique text styles help you differentiate yourself from millions of other Instagram users</li>
          </ul>
          
          <h3>How Instagram Font Changing Works</h3>
          
          <p>Instagram font changing is simpler than you might think. Our font copy paste tool generates special Unicode characters that Instagram recognizes and displays correctly. These characters look like fancy versions of regular letters but are actually different Unicode symbols that create the visual effect of different fonts.</p>
          
          <h4>Benefits of Using Font Copy Paste Tools</h4>
          
          <div className="features-grid">
            <div className="feature-card">
              <h4>Instant Results</h4>
              <p>Generate hundreds of font variations in seconds with our fancy text generator</p>
            </div>
            <div className="feature-card">
              <h4>No Installation Required</h4>
              <p>Use our Instagram text generator directly in your browser - no downloads needed</p>
            </div>
            <div className="feature-card">
              <h4>Completely Free</h4>
              <p>Access all our font styles without any cost or hidden fees</p>
            </div>
            <div className="feature-card">
              <h4>Easy to Use</h4>
              <p>Simply copy and paste - no technical skills required</p>
            </div>
          </div>
           <h3>Sample IG Fonts and IG Bio for your Profile</h3>
          
          <p className="section-description">
            Explore these sample Instagram fonts and bios to get inspiration for your own profile. 
            Each example showcases different styling options that you can use to make your Instagram 
            presence stand out. Click the copy button to instantly use any style in your bio.
          </p>
          
          <h4>Sample IG Fonts</h4>
          <div className="bio-grid">
            {sampleFonts.map((font, index) => (
              <div className="bio-card font-card" key={index}>
                <div className="card-front">
                  <div className="bio-text">
                    <pre>{font.text}</pre>
                  </div>
                  <div className="font-style-name">
                    {font.style}
                  </div>
                  <button className="copy-btn" onClick={() => handleSampleCopy(font.text)}>
                    {copiedText === font.text ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="ig-fonts-generate-btn" style={{ maxWidth: '300px', margin: '20px auto' }} onClick={handleGenerate}>
            Generate
          </button>
          
          <h4>Sample IG Bio</h4>
          <div className="bio-grid">
            {[1, 2, 3].map((index) => (
              <div 
                key={index} 
                className={`bio-card ${flippedCards[index] ? 'flipped' : ''}`}
                onClick={() => toggleFlip(index)}
              >
                <div className="card-inner">
                  <div className="card-front">
                    <div className="bio-text">
                      {sampleBios[index-1]?.front || `🌟 Sample Bio Card ${index} 🌟
💫 This is a sample Instagram bio
👉 Click flip to see preview`}
                    </div>
                    <div className="card-buttons">
                      <button 
                        className="flip-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(index);
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 4v16"></path>
                          <path d="M8 8l-4 4 4 4"></path>
                          <path d="M16 8l4 4-4 4"></path>
                        </svg>
                        <span>Flip</span>
                      </button>
                      <button 
                        className="copy-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          const bioText = sampleBios[index-1]?.front || `Sample Bio Card ${index}`;
                          handleSampleCopy(bioText);
                        }}
                      >
                        {copiedText === (sampleBios[index-1]?.front || `Sample Bio Card ${index}`) ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="instagram-preview">
                      <div className="preview-header">
                        <div className="preview-avatar">
                          <div className="preview-avatar-image">
                            <div className="preview-story-ring"></div>
                            <div className="preview-pic" style={{backgroundColor: '#ddd'}}></div>
                          </div>
                        </div>
                        <div className="preview-info">
                          <div className="preview-username">@yourusername</div>
                          <div className="preview-stats">
                            <div className="preview-stat">
                              <strong>365</strong>
                              <span>Posts</span>
                            </div>
                            <div className="preview-stat">
                              <strong>201k</strong>
                              <span>Followers</span>
                            </div>
                            <div className="preview-stat">
                              <strong>150</strong>
                              <span>Following</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          className="preview-edit-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Edit Profile
                        </button>
                      </div>
                      <div className="preview-bio">
                        {sampleBios[index-1]?.back || `🌟 Sample Bio Card ${index} 🌟
💫 This is a sample Instagram bio
👉 This is how it looks on Instagram`}
                      </div>
                    </div>
                    <button 
                      className="copy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        const bioText = sampleBios[index-1]?.back || `Sample Bio Card ${index}`;
                        handleSampleCopy(bioText);
                      }}
                    >
                      {copiedText === (sampleBios[index-1]?.back || `Sample Bio Card ${index}`) ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="ig-fonts-generate-btn" style={{ maxWidth: '300px', margin: '20px auto' }} onClick={() => window.location.href = '/instagram-bio'}>
            Get More
          </button>
          
          <h3>Popular Instagram Fonts and Styles</h3>
          
          <p>Discover the most popular Instagram fonts and styles used by influencers and celebrities to enhance their profiles. These fonts are not only visually appealing but also help in standing out in the crowded Instagram space.</p>
          
          <div className="bio-grid">
            {popularFonts.map((font, index) => (
              <div className="bio-card font-card" key={index}>
                <div className="card-front">
                  <div className="bio-text">
                    {font.text}
                  </div>
                  <div className="font-style-name">
                    {font.style}
                  </div>
                  <button className="copy-btn" onClick={() => handleSampleCopy(font.text)}>
                    {copiedText === font.text ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h3>Popular Instagram Fonts and Styles</h3>
          
          <p>Our IG fonts tool offers a wide variety of font styles to suit any personality or brand:</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Font Style</th>
                  <th>Description</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bold Text</td>
                  <td>Thicker, more prominent characters</td>
                  <td>Headlines and important info</td>
                </tr>
                <tr>
                  <td>Italic Text</td>
                  <td>Slanted, elegant lettering</td>
                  <td>Quotes and sophisticated bios</td>
                </tr>
                <tr>
                  <td>Script Fonts</td>
                  <td>Cursive, handwritten styles</td>
                  <td>Personal profiles and creative brands</td>
                </tr>
                <tr>
                  <td>Fraktur Fonts</td>
                  <td>Old-world, gothic styling</td>
                  <td>Gothic, fantasy, or historical themes</td>
                </tr>
                <tr>
                  <td>Emoji Combinations</td>
                  <td>Text with decorative emojis</td>
                  <td>Fun, casual, or thematic bios</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h3>Maximizing Your Instagram Font Generator Experience</h3>
          
          <p>To get the most out of our Instagram font generator, consider these tips:</p>
          
          <ol>
            <li><strong>Match Your Brand:</strong> Choose fonts that align with your personal or brand identity</li>
            <li><strong>Test Readability:</strong> Ensure your chosen fonts are still easy to read on mobile devices</li>
            <li><strong>Use Sparingly:</strong> Don't overuse fancy fonts - use them strategically for maximum impact</li>
            <li><strong>Stay Consistent:</strong> Maintain a consistent style throughout your profile</li>
            <li><strong>Update Regularly:</strong> Refresh your bio fonts periodically to keep your profile looking fresh</li>
          </ol>
          
          <div className="faq-section">
            <h3>Frequently Asked Questions</h3>
            
            <div className="faq-item">
              <div className={`faq-question ${openItems.q1 ? 'open' : ''}`} onClick={() => toggleItem('q1')}>
                <span>Are these fonts compatible with all devices?</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className={`faq-answer ${openItems.q1 ? 'open' : ''}`}>
                <p>Yes, our Instagram font generator creates Unicode characters that are compatible with all modern devices and operating systems. Your fancy text will display correctly on iOS, Android, Windows, and Mac devices.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className={`faq-question ${openItems.q2 ? 'open' : ''}`} onClick={() => toggleItem('q2')}>
                <span>Do I need to install any fonts on my device?</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className={`faq-answer ${openItems.q2 ? 'open' : ''}`}>
                <p>No installation is required. Our font copy paste tool works entirely in your browser. Simply generate the text you want, copy it, and paste it directly into your Instagram bio or posts.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className={`faq-question ${openItems.q3 ? 'open' : ''}`} onClick={() => toggleItem('q3')}>
                <span>Will Instagram ban me for using these fonts?</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className={`faq-answer ${openItems.q3 ? 'open' : ''}`}>
                <p>No, Instagram does not ban users for using special characters or Unicode fonts in their bios. These are standard Unicode characters that Instagram supports. However, always follow Instagram's community guidelines for content.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className={`faq-question ${openItems.q4 ? 'open' : ''}`} onClick={() => toggleItem('q4')}>
                <span>How many different font styles can I generate?</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className={`faq-answer ${openItems.q4 ? 'open' : ''}`}>
                <p>Our Instagram font generator offers over 100 different font styles and variations. This includes various bold, italic, script, fraktur, and emoji combinations to ensure you'll find the perfect style for your needs.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className={`faq-question ${openItems.q5 ? 'open' : ''}`} onClick={() => toggleItem('q5')}>
                <span>Can I use these fonts in Instagram posts and stories?</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className={`faq-answer ${openItems.q5 ? 'open' : ''}`}>
                <p>Absolutely! While our tool is particularly useful for bios, you can use the generated fonts in Instagram posts, stories, comments, and anywhere else on the platform where text input is allowed.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className={`faq-question ${openItems.q6 ? 'open' : ''}`} onClick={() => toggleItem('q6')}>
                <span>How to Get New font on ig Stories</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className={`faq-answer ${openItems.q6 ? 'open' : ''}`}>
                <p>To add new fonts to your Instagram Stories, simply generate your desired text using our font generator, copy it, and paste it into the text tool when creating your story. Instagram Stories support all Unicode characters, so any fancy text you create with our tool will display correctly in your stories.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className={`faq-question ${openItems.q7 ? 'open' : ''}`} onClick={() => toggleItem('q7')}>
                <span>How to change new font in ig bio</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className={`faq-answer ${openItems.q7 ? 'open' : ''}`}>
                <p>To change your Instagram bio font, generate your desired text using our tool, copy it, and paste it into your Instagram bio editing section. You can update your bio as often as you like to showcase different fonts and styles. Remember to save your changes after pasting the new text.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className={`faq-question ${openItems.q8 ? 'open' : ''}`} onClick={() => toggleItem('q8')}>
                <span>Free Font Generator for ig bio and story</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className={`faq-answer ${openItems.q8 ? 'open' : ''}`}>
                <p>Our Instagram font generator is completely free to use for all your bio and story needs. No registration, no hidden fees, and no limitations on how many fonts you can generate. Simply visit our tool, enter your text, and choose from over 100 different font styles to enhance your Instagram presence.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className={`faq-question ${openItems.q9 ? 'open' : ''}`} onClick={() => toggleItem('q9')}>
                <span>What font does Drake use on his ig</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className={`faq-answer ${openItems.q9 ? 'open' : ''}`}>
                <p>We don't have specific information about Drake's Instagram font choices, as celebrities often change their styling. However, you can achieve similar professional and stylish looks using our bold or script font options. Our tool offers a wide variety of fonts that can help you create a celebrity-worthy Instagram presence.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className={`faq-question ${openItems.q10 ? 'open' : ''}`} onClick={() => toggleItem('q10')}>
                <span>What fonts does ig supports</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className={`faq-answer ${openItems.q10 ? 'open' : ''}`}>
                <p>Instagram supports all standard Unicode characters, which means you can use any text generated by our font tool. This includes special characters, symbols, and various Unicode fonts. Instagram doesn't have specific font limitations, so you're free to get creative with your bio and post text using our generator.</p>
              </div>
            </div>
          </div>

          
          <h3>Conclusion</h3>
          
          <p>Our Instagram font generator is the ultimate tool for anyone looking to enhance their social media presence. With its easy-to-use interface, wide variety of font styles, and completely free access, it's never been easier to create a standout Instagram profile. Whether you're a personal brand, business, or just looking to make your profile more interesting, our font Instagram tool has everything you need to succeed.</p>
          
          <p>Start transforming your Instagram presence today with our powerful and versatile Instagram font generator!</p>
        </article>
      </div>
    </div>
  );
};

export default IgFonts;