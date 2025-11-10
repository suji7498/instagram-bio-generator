import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { Header, Footer, Toast } from '../App'; // Import universal components
import './IgFonts.css';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkTheme, toggleTheme } = useTheme();
  const [generatedFonts, setGeneratedFonts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState(null);
  const ITEMS_PER_PAGE = 50; // Changed from 32 to 50 as requested

  // Get the input text from location state
  const inputText = location.state?.inputText || '';

  useEffect(() => {
    // If no input text, redirect to home
    if (!inputText) {
      navigate('/');
      return;
    }

    // Import the generateFancyText function
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
            'A': 'α', 'B': 'в', 'C': '¢', 'D': 'đ', 'E': 'є', 'F': 'ƒ', 'G': 'g', 'H': 'ħ', 'I': 'ι', 'J': 'j', 'K': 'к', 'L': 'ł', 'M': 'ม',
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
        }},
        // New font styles from HTML.txt
        { name: "Wingdings Style", transform: (char) => {
          const wingdingsMap = {
            '0': '📁', '1': '📂', '2': '📄', '3': '🗏', '4': '🗐', '5': '🗄', '6': '⌛', '7': '🖮', '8': '🖰', '9': '🖲',
            '!': '✏', '"': '✂', '#': '✁', '$': '👓', '%': '🕭', '&': '🕮', "'": '🕯', '(': '🕿', ')': '✆', '*': '🖂', '+': '🖃',
            ',': '📪', '-': '📫', '.': '📬', '/': '📭', ':': '🖳', ';': '🖴', '<': '🖫', '=': '🖬', '>': '✇', '?': '✍',
            'A': '✌', 'B': '👌', 'C': '👍', 'D': '👎', 'E': '☜', 'F': '☞', 'G': '☝', 'H': '☟', 'I': '✋', 'J': '☺',
            'K': '😐', 'L': '☹', 'M': '💣', 'N': '☠', 'O': '⚐', 'P': '🏱', 'Q': '✈', 'R': '☼', 'S': '💧', 'T': '❄',
            'U': '🕆', 'V': '✞', 'W': '🕈', 'X': '✠', 'Y': '✡', 'Z': '☪', '[': '☯', '\\': 'ॐ', ']': '☸', '^': '♈',
            '_': '♉', '`': '♊', 'a': '♋', 'b': '♌', 'c': '♍', 'd': '♎', 'e': '♏', 'f': '♐', 'g': '♑', 'h': '♒',
            'i': '♓', 'j': '🙰', 'k': '🙵', 'l': '●', 'm': '❍', 'n': '■', 'o': '□', 'p': '◻', 'q': '❑', 'r': '❒',
            's': '⬧', 't': '⧫', 'u': '◆', 'v': '❖', 'w': '⬥', 'x': '⌧', 'y': '⍓', 'z': '⌘', '{': '❀', '|': '✿',
            '}': '❝', '~': '❞', '': '▯', '€': '⓪', '': '①', '‚': '②', 'ƒ': '③', '„': '④', '…': '⑤', '†': '⑥',
            '‡': '⑦', 'ˆ': '⑧', '‰': '⑨', 'Š': '⑩', '‹': '⓿', 'Œ': '❶', '': '❷', 'Ž': '❸', '': '❹', '': '❺',
            '‘': '❻', '’': '❼', '“': '❽', '”': '❾', '•': '❿'
          };
          return wingdingsMap[char] || char;
        }},
        { name: "Vaporwave Style", transform: (char) => {
          const vaporwaveMap = {
            ' ': '　', '`': '`', '1': '１', '2': '２', '3': '３', '4': '４', '5': '５', '6': '６', '7': '７', '8': '８', '9': '９', '0': '０',
            '-': '－', '=': '＝', '~': '~', '!': '！', '@': '＠', '#': '＃', '$': '＄', '%': '％', '^': '^', '&': '＆', '*': '＊',
            '(': '（', ')': '）', '_': '_', '+': '＋', 'q': 'ｑ', 'w': 'ｗ', 'e': 'ｅ', 'r': 'ｒ', 't': 'ｔ', 'y': 'ｙ', 'u': 'ｕ',
            'i': 'ｉ', 'o': 'ｏ', 'p': 'ｐ', '[': '[', ']': ']', '\\': '\\', 'Q': 'Ｑ', 'W': 'Ｗ', 'E': 'Ｅ', 'R': 'Ｒ', 'T': 'Ｔ',
            'Y': 'Ｙ', 'U': 'Ｕ', 'I': 'Ｉ', 'O': 'Ｏ', 'P': 'Ｐ', '{': '{', '}': '}', '|': '|', 'a': 'ａ', 's': 'ｓ', 'd': 'ｄ',
            'f': 'ｆ', 'g': 'ｇ', 'h': 'ｈ', 'j': 'ｊ', 'k': 'ｋ', 'l': 'ｌ', ';': '；', "'": '＇', 'A': 'Ａ', 'S': 'Ｓ', 'D': 'Ｄ',
            'F': 'Ｆ', 'G': 'Ｇ', 'H': 'Ｈ', 'J': 'Ｊ', 'K': 'Ｋ', 'L': 'Ｌ', ':': '：', '"': '"', 'z': 'ｚ', 'x': 'ｘ', 'c': 'ｃ',
            'v': 'ｖ', 'b': 'ｂ', 'n': 'ｎ', 'm': 'ｍ', ',': '，', '.': '．', '/': '／', 'Z': 'Ｚ', 'X': 'Ｘ', 'C': 'Ｃ', 'V': 'Ｖ',
            'B': 'Ｂ', 'N': 'Ｎ', 'M': 'Ｍ', '<': '<', '>': '>', '?': '？'
          };
          return vaporwaveMap[char] || char;
        }},
        { name: "Asian Style 1", transform: (char) => {
          const asianStyle1Map = {
            '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
            'a': 'ﾑ', 'b': '乃', 'c': 'ᄃ', 'd': 'り', 'e': '乇', 'f': 'ｷ', 'g': 'ム', 'h': 'ん', 'i': 'ﾉ', 'j': 'ﾌ',
            'k': 'ズ', 'l': 'ﾚ', 'm': 'ﾶ', 'n': '刀', 'o': 'の', 'p': 'ｱ', 'q': 'ゐ', 'r': '尺', 's': '丂', 't': 'ｲ',
            'u': 'ひ', 'v': '√', 'w': 'W', 'x': 'ﾒ', 'y': 'ﾘ', 'z': '乙', 'A': 'ﾑ', 'B': '乃', 'C': 'ᄃ', 'D': 'り',
            'E': '乇', 'F': 'ｷ', 'G': 'ム', 'H': 'ん', 'I': 'ﾉ', 'J': 'ﾌ', 'K': 'ズ', 'L': 'ﾚ', 'M': 'ﾶ', 'N': '刀',
            'O': 'の', 'P': 'ｱ', 'Q': 'ゐ', 'R': '尺', 'S': '丂', 'T': 'ｲ', 'U': 'ひ', 'V': '√', 'W': 'W', 'X': 'ﾒ',
            'Y': 'ﾘ', 'Z': '乙'
          };
          return asianStyle1Map[char] || char;
        }},
        { name: "Asian Style 2", transform: (char) => {
          const asianStyle2Map = {
            '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
            'a': '卂', 'b': '乃', 'c': '匚', 'd': 'ᗪ', 'e': '乇', 'f': '千', 'g': 'Ꮆ', 'h': '卄', 'i': '丨', 'j': 'ﾌ',
            'k': 'Ҝ', 'l': 'ㄥ', 'm': '爪', 'n': '几', 'o': 'ㄖ', 'p': '卩', 'q': 'Ɋ', 'r': '尺', 's': '丂', 't': 'ㄒ',
            'u': 'ㄩ', 'v': 'ᐯ', 'w': '山', 'x': '乂', 'y': 'ㄚ', 'z': '乙', 'A': '卂', 'B': '乃', 'C': '匚', 'D': 'ᗪ',
            'E': '乇', 'F': '千', 'G': 'Ꮆ', 'H': '卄', 'I': '丨', 'J': 'ﾌ', 'K': 'Ҝ', 'L': 'ㄥ', 'M': '爪', 'N': '几',
            'O': 'ㄖ', 'P': '卩', 'Q': 'Ɋ', 'R': '尺', 'S': '丂', 'T': 'ㄒ', 'U': 'ㄩ', 'V': 'ᐯ', 'W': '山', 'X': '乂',
            'Y': 'ㄚ', 'Z': '乙'
          };
          return asianStyle2Map[char] || char;
        }},
        { name: "Flourish Style 1", transform: (char) => {
          // This is a decorative style that adds flourishes around text
          // We'll implement this as a special case in the emoji combinations
          return char;
        }},
        { name: "Flourish Style 2", transform: (char) => {
          // This is a decorative style that adds flourishes around text
          // We'll implement this as a special case in the emoji combinations
          return char;
        }},
        { name: "Strike Through", transform: (char) => {
          const strikeThroughMap = {
            'a': 'a̶', 'b': 'b̶', 'c': 'c̶', 'd': 'd̶', 'e': 'e̶', 'f': 'f̶', 'g': 'g̶', 'h': 'h̶', 'i': 'i̶', 'j': 'j̶',
            'k': 'k̶', 'l': 'l̶', 'm': 'm̶', 'n': 'n̶', 'o': 'o̶', 'p': 'p̶', 'q': 'q̶', 'r': 'r̶', 's': 's̶', 't': 't̶',
            'u': 'u̶', 'v': 'v̶', 'w': 'w̶', 'x': 'x̶', 'y': 'y̶', 'z': 'z̶', 'A': 'A̶', 'B': 'B̶', 'C': 'C̶', 'D': 'D̶',
            'E': 'E̶', 'F': 'F̶', 'G': 'G̶', 'H': 'H̶', 'I': 'I̶', 'J': 'J̶', 'K': 'K̶', 'L': 'L̶', 'M': 'M̶', 'N': 'N̶',
            'O': 'O̶', 'P': 'P̶', 'Q': 'Q̶', 'R': 'R̶', 'S': 'S̶', 'T': 'T̶', 'U': 'U̶', 'V': 'V̶', 'W': 'W̶', 'X': 'X̶',
            'Y': 'Y̶', 'Z': 'Z̶', '0': '0̶', '1': '1̶', '2': '2̶', '3': '3̶', '4': '4̶', '5': '5̶', '6': '6̶', '7': '7̶',
            '8': '8̶', '9': '9̶'
          };
          return strikeThroughMap[char] || char;
        }},
        { name: "Underline", transform: (char) => {
          const underlineMap = {
            'a': 'a̲', 'b': 'b̲', 'c': 'c̲', 'd': 'd̲', 'e': 'e̲', 'f': 'f̲', 'g': 'g̲', 'h': 'h̲', 'i': 'i̲', 'j': 'j̲',
            'k': 'k̲', 'l': 'l̲', 'm': 'm̲', 'n': 'n̲', 'o': 'o̲', 'p': 'p̲', 'q': 'q̲', 'r': 'r̲', 's': 's̲', 't': 't̲',
            'u': 'u̲', 'v': 'v̲', 'w': 'w̲', 'x': 'x̲', 'y': 'y̲', 'z': 'z̲', 'A': 'A̲', 'B': 'B̲', 'C': 'C̲', 'D': 'D̲',
            'E': 'E̲', 'F': 'F̲', 'G': 'G̲', 'H': 'H̲', 'I': 'I̲', 'J': 'J̲', 'K': 'K̲', 'L': 'L̲', 'M': 'M̲', 'N': 'N̲',
            'O': 'O̲', 'P': 'P̲', 'Q': 'Q̲', 'R': 'R̲', 'S': 'S̲', 'T': 'T̲', 'U': 'U̲', 'V': 'V̲', 'W': 'W̲', 'X': 'X̲',
            'Y': 'Y̲', 'Z': 'Z̲', '0': '0̲', '1': '1̲', '2': '2̲', '3': '3̲', '4': '4̲', '5': '5̲', '6': '6̲', '7': '7̲',
            '8': '8̲', '9': '9̲'
          };
          return underlineMap[char] || char;
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
        { name: "Angel Wings", prefix: "👼", suffix: "👼" },
        // Decorative flourish styles from HTML.txt
        { name: "Flourish Style 1", prefix: "★·.·´¯`·.·★", suffix: "★·.·´¯`·.·★" },
        { name: "Flourish Style 2", prefix: "▁ ▂ ▄ ▅ ▆ ▇ █", suffix: "█ ▇ ▆ ▅ ▄ ▂ ▁" },
        { name: "Flourish Style 3", prefix: "°°°·.°·..·°¯°·._.·", suffix: "·._.·°¯°·.·° .·°°°" },
        { name: "Flourish Style 4", prefix: "¸,ø¤º°`°º¤ø,¸¸,ø¤º°", suffix: "°º¤ø,¸¸,ø¤º°`°º¤ø,¸" },
        { name: "Flourish Style 5", prefix: "ıllıllı", suffix: "ıllıllı" },
        { name: "Vaporwave Decorative", prefix: "【﻿", suffix: "】" }
      ];

      // Generate font styles with more variations to reach 300 results
      const fontResults = [];
      
      // Generate results for each style with different variations
      styles.forEach(style => {
        // Original style
        const transformedText = text.split('').map(char => style.transform(char)).join('');
        fontResults.push({
          id: Math.random().toString(36).substr(2, 9),
          name: style.name,
          text: transformedText
        });
        
        // Add variations for selected styles to increase result count
        if (style.name === "Bold" || style.name === "Italic" || style.name === "Script" || 
            style.name === "Cute Style" || style.name === "Vaporwave Style") {
          // Add a second variation with extra styling
          const variation1 = text.split('').map(char => {
            // Add some decorative elements for variation
            const transformed = style.transform(char);
            return transformed;
          }).join('');
          fontResults.push({
            id: Math.random().toString(36).substr(2, 9),
            name: `${style.name} Variation 1`,
            text: `✨ ${variation1} ✨`
          });
          
          // Add a third variation with different decorative elements
          const variation2 = text.split('').map(char => {
            const transformed = style.transform(char);
            return transformed;
          }).join('');
          fontResults.push({
            id: Math.random().toString(36).substr(2, 9),
            name: `${style.name} Variation 2`,
            text: `⭐ ${variation2} ⭐`
          });
        }
      });

      // Add more font styles by combining existing ones
      for (let i = 0; i < 50; i++) {
        const style1 = styles[Math.floor(Math.random() * styles.length)];
        const style2 = styles[Math.floor(Math.random() * styles.length)];
        const combinedText = text.split('').map(char => {
          // Alternate between two styles
          return Math.random() > 0.5 ? style1.transform(char) : style2.transform(char);
        }).join('');
        fontResults.push({
          id: Math.random().toString(36).substr(2, 9),
          name: `${style1.name} + ${style2.name} Mix`,
          text: combinedText
        });
      }

      // Generate emoji combinations with more variations
      const emojiResults = [];
      emojiCombinations.forEach((combo, index) => {
        // Apply a random font style to the text for variety
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        const styledText = text.split('').map(char => randomStyle.transform(char)).join('');
        
        emojiResults.push({
          id: `emoji-${index}`,
          name: combo.name,
          text: `${combo.prefix} ${styledText} ${combo.suffix}`
        });
      });

      // Add more emoji combinations with different styling
      for (let i = 0; i < 100; i++) {
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        const styledText = text.split('').map(char => randomStyle.transform(char)).join('');
        const emojis = ["🔥", "✨", "🌟", "💫", "⭐", "💎", "💖", "🌸", "🌺", "🌻", "🌼", "🌷", "🌹", "💐", "🌈"];
        const prefix = emojis[Math.floor(Math.random() * emojis.length)];
        const suffix = emojis[Math.floor(Math.random() * emojis.length)];
        
        emojiResults.push({
          id: `emoji-extra-${i}`,
          name: `Emoji Style ${i + 1}`,
          text: `${prefix} ${styledText} ${suffix}`
        });
      }

      // Combine both results and limit to 300
      const allResults = [...fontResults, ...emojiResults];
      return allResults.slice(0, 300); // Limit to 300 results as requested
    };

    // Generate the fonts
    const results = generateFancyText(inputText);
    setGeneratedFonts(results);
  }, [inputText, navigate]);

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Pagination logic with emoji combinations limited to 5 per page
  const totalPages = Math.ceil(generatedFonts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  // Get current page items
  let currentFonts = generatedFonts.slice(startIndex, endIndex);
  
  // Ensure only 5 emoji combinations appear per page
  if (currentFonts.length > 0) {
    // Count how many emoji combinations are in the current page
    const emojiCount = currentFonts.filter(font => font.id.startsWith('emoji-')).length;
    
    // If more than 5 emoji combinations, replace extras with font styles
    if (emojiCount > 5) {
      let emojiCounter = 0;
      currentFonts = currentFonts.map(font => {
        if (font.id.startsWith('emoji-')) {
          emojiCounter++;
          // Keep only first 5 emoji combinations
          if (emojiCounter > 5) {
            // Replace with a font style from the same page range if available
            const fontStyles = generatedFonts.slice(0, generatedFonts.length - 20); // Exclude emoji combinations
            const replacementIndex = (startIndex + currentFonts.indexOf(font)) % fontStyles.length;
            return fontStyles[replacementIndex] || font;
          }
        }
        return font;
      });
    }
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Header />
  
      {/* Normal section instead of hero section with results */}
      <div className="normal-section">
        <div className="ig-fonts-container">
          <div className="ig-fonts-header">
            <h2>Generated Fonts</h2>
            <p>Here are your generated font styles for "{inputText}"</p>
          </div>
  
          {/* SEO Content Section - Added for internal linking */}
          <div className="seo-content-section">
            <p className="seo-description">
              These font styles were generated using our <a href="/">free Instagram font generator</a>. 
              You can also explore our <a href="/instagram-bio">Instagram bio ideas</a> for more creative content.
            </p>
          </div>
  
          {generatedFonts.length > 0 && (
            <div className="ig-fonts-results-section">
              <div className="ig-fonts-results-header">
                <h3>Generated Fonts</h3>
                <span>{generatedFonts.length} styles</span>
              </div>
              
              <div className="ig-fonts-grid">
                {currentFonts.map((font) => (
                  <div key={font.id} className="ig-fonts-card">
                    <div className="ig-fonts-card-content">
                      <div className="ig-fonts-generated-text">{font.text}</div>
                    </div>
                    <button 
                      className="ig-fonts-copy-btn"
                      onClick={() => handleCopy(font.text, font.id)}
                    >
                      {copiedId === font.id ? (
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
                ))}
              </div>
              
              {/* Pagination */}
              <div className="ig-fonts-pagination">
                <button 
                  className="ig-fonts-pagination-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    className={`ig-fonts-pagination-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    disabled={page === '...'}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  className="ig-fonts-pagination-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ResultsPage;
