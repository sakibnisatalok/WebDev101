

/*
STRING METHODS — A JAVASCRIPT REVISION MODULE
============================================
Run from the JS folder:
  node "builtinMethods/string methods.js"

Each { ... } section has its own variables. Read the comments, predict the result,
then run the file. Expected values appear beside console.log calls. No packages,
browser APIs, or network requests are required. Use a modern JavaScript runtime.

CONTENTS
  Foundations: immutability, primitive vs wrapper, objects/functions, Unicode
  01–04: at, charAt, charCodeAt, codePointAt
  05–06: slice, substring (and why to avoid legacy substr)
  07–11: includes, startsWith, endsWith, indexOf, lastIndexOf
  12–15: toLowerCase, toUpperCase, toLocaleLowerCase, toLocaleUpperCase
  16–18: trim, trimStart, trimEnd
  19–20: replace, replaceAll (including callback functions)
  21–25: split, concat, repeat, padStart, padEnd
  26–28: match, matchAll, search
  29–30: normalize, localeCompare
  31–32: toString, valueOf
  33–35: String.fromCharCode, String.fromCodePoint, String.raw
  36–37: isWellFormed, toWellFormed
  Closing examples: objects, functions, arrays, method chaining, choosing a method

QUICK RULES
  String VALUES are immutable. None of these string methods edits the original
  string's characters. Methods that transform text return a new string VALUE.
  Assign that result if you want a variable to contain the changed text.
  .length is a property, not a method.
  Most positions use UTF-16 code units, not necessarily visible characters.
  slice/substring exclude the ending position; at/charAt read one code unit.
  Searching is case-sensitive unless you explicitly choose another approach.

HOW THESE METHODS RELATE TO OBJECTS AND FUNCTIONS
  On an object: call a string method on a STRING PROPERTY, such as user.name.trim().
  On a function: call the function, then use its returned string, e.g. getName().trim().
  replace and replaceAll can use a replacement FUNCTION as a callback.
  Other ordinary string arguments are generally converted to text. A function
  passed as such an argument is not automatically executed to get its result.
  charCodeAt/codePointAt/search/localeCompare return numbers; split/match return
  arrays (match can also return null); matchAll returns an iterator.
  Plain objects and functions do not inherit string methods from String.prototype.

Further reading (the examples and notes here are written for this module):
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
  Individual method pages append /slice, /replace, /split, etc. to that URL.
*/

// FOUNDATIONS A: immutable values and assigning the returned result.
{
  const original = "hello";
  const upper = original.toUpperCase();
  console.log(original, upper); // "hello", "HELLO"
  let name = "  sakib  ";
  name = name.trim(); // Reassigning the variable is allowed because it uses let.
  console.log(name); // "sakib"
  // original[0] = "H" does not edit the string. It throws in strict mode and
  // is ignored in non-strict mode. Build a new value instead.
  console.log("H" + original.slice(1)); // "Hello"
}

// FOUNDATIONS B: a string primitive vs a String wrapper OBJECT.
{
  const primitive = "hello";
  const wrapper = new String("hello");
  console.log(typeof primitive, typeof wrapper); // "string", "object"
  console.log(primitive.toUpperCase()); // "HELLO": JS provides string methods
  // through temporary boxing/property access; you need not write new String().
  console.log(wrapper === primitive); // false
  console.log(wrapper.valueOf() === primitive); // true
  console.log(Boolean(""), Boolean(new String(""))); // false, true
  // Even an empty String wrapper is a truthy OBJECT. Prefer primitive strings:
  console.log(String(42)); // "42"; String(...) without new returns a primitive.
}

// FOUNDATIONS C: string properties, functions returning strings, and conversion.
{
  const user = { name: "  Sakib  " };
  function getLanguage() { return "javascript"; }
  console.log(user.name.trim()); // "Sakib"
  console.log(user.name); // "  Sakib  ": the property was not reassigned.
  console.log(getLanguage().toUpperCase()); // "JAVASCRIPT"
  console.log(String({ name: "Sakib" })); // "[object Object]", not JSON.
  console.log(JSON.stringify({ name: "Sakib" })); // '{"name":"Sakib"}'
  const item = { toString() { return "Pen"; } };
  console.log("Buy ".concat(item)); // "Buy Pen": uses the custom string conversion.
  // getLanguage.toUpperCase() would throw: that value is a function, not its result.
  // null.trim() / undefined.trim() throw. For an optional string property:
  console.log((user.nickname ?? "").trim()); // "": choose a meaningful fallback.
}

// FOUNDATIONS D: UTF-16 code units, code points, and visible characters.
{
  const text = "A😀B";
  console.log(text.length); // 4: A=1 unit, emoji=2 units, B=1 unit.
  console.log(Array.from(text)); // ["A", "😀", "B"]: Unicode code points.
  console.log(Array.from(text).length); // 3
  console.log("e\u0301".length); // 2: e + combining accent, often shown as one character.
  // Code points are not always complete visible characters (grapheme clusters).
  // Use Intl.Segmenter for visible-character segmentation where required.
  // Simple ASCII examples below have one code unit per character.
}

// 01. at(index)
// Purpose: read a code unit; negative indexes count from the end.
// Returns: one-unit string or undefined if out of range. Original unchanged.
// Objects/functions: call on their string property/result; no callback is accepted.
{
  const word = "Sakib";
  console.log(word.at(0), word.at(-1), word.at(-2)); // "S", "b", "i"
  console.log(word.at(99)); // undefined
  console.log(word[-1]); // undefined: [] does not implement negative indexing.
  const user = { name: "Mina" };
  console.log(user.name.at(-1)); // "a"
  // Emoji can be split in half because at() reads a code unit, not a whole emoji.
  console.log("😀".at(0).length); // 1
}

// 02. charAt(index = 0)
// Purpose: read one code unit at an index.
// Returns: one-unit string; out-of-range -> EMPTY STRING. Original unchanged.
// Negative indexes are out of range; they do not count backwards.
{
  console.log("Sakib".charAt(0)); // "S"
  console.log("Sakib".charAt(99)); // ""
  console.log("Sakib".charAt(-1)); // ""
  console.log("".charAt(0)); // ""
  const getWord = () => "JavaScript";
  console.log(getWord().charAt(4)); // "S"
  // Compare: text[99] / text.at(99) return undefined, not an empty string.
}

// 03. charCodeAt(index = 0)
// Purpose: get the numeric value of a UTF-16 code unit.
// Returns: integer 0–65535; out-of-range -> NaN. Original unchanged.
// Useful for simple character-code work; not a full Unicode code-point reader.
{
  console.log("ABC".charCodeAt(0)); // 65
  console.log("abc".charCodeAt(0)); // 97
  console.log(Number.isNaN("A".charCodeAt(99))); // true
  console.log("😀".charCodeAt(0).toString(16)); // "d83d": first surrogate unit.
  // A character code is a number, so it has number methods such as toString(16).
}

// 04. codePointAt(index = 0)
// Purpose: read a Unicode code point starting at a code-unit index.
// Returns: integer or undefined if out of range. Original unchanged.
// A leading surrogate plus a following trailing surrogate is read as one point.
// The index still counts code units! Index 1 can point into the middle of an emoji.
{
  console.log("A".codePointAt(0)); // 65
  console.log("😀".codePointAt(0)); // 128512 (U+1F600)
  console.log("😀".codePointAt(1)); // 56832: the trailing surrogate alone.
  console.log("A".codePointAt(99)); // undefined
  console.log(Array.from("A😀", char => char.codePointAt(0))); // [65, 128512]
}

// 05. slice(start = 0, end = length)
// Purpose: extract text. Start INCLUDED, end EXCLUDED. Returns: string.
// Original unchanged. Negative bounds count from the end; positions are clamped.
// End before start -> empty string. No callback; works on object string properties.
{
  const word = "JavaScript";
  console.log(word.slice(0, 4)); // "Java"
  console.log(word.slice(4)); // "Script"
  console.log(word.slice(-6)); // "Script"
  console.log(word.slice(0, -6)); // "Java"
  console.log(word.slice(4, 0)); // ""
  const file = { name: "photo.png" };
  console.log(file.name.slice(-3)); // "png"
  console.log(word); // "JavaScript"
}

// 06. substring(start = 0, end = length)
// Purpose: extract text using nonnegative positions. Returns: string.
// Original unchanged. Negative/NaN positions become 0. Start > end swaps them.
// End excluded. This makes it behave differently from slice for unusual bounds.
{
  console.log("JavaScript".substring(0, 4)); // "Java"
  console.log("JavaScript".substring(4, 0)); // "Java": positions are swapped.
  console.log("JavaScript".substring(-6)); // "JavaScript": -6 becomes 0.
  console.log("JavaScript".slice(-6)); // "Script": negative index from the end.
  const user = { name: "Sakib" };
  console.log(user.name.substring(0, 3)); // "Sak"
  // Legacy substr(start, length) takes a LENGTH, not an ending index. It is
  // deprecated; use slice(start, start + length) instead in new code.
}

// 07. includes(searchString, position = 0)
// Purpose: ask whether text contains a substring. Returns: boolean.
// Original unchanged. Case-sensitive. Regex arguments are rejected with TypeError.
// Empty search text always matches (including in an empty string).
{
  console.log("JavaScript".includes("Script")); // true
  console.log("JavaScript".includes("script")); // false
  console.log("banana".includes("ban", 1)); // false: starts after index 0.
  console.log("".includes("")); // true
  const user = { email: "sakib@example.com" };
  console.log(user.email.includes("@")); // true: simple presence check, not full validation.
  try {
    "abc".includes(/a/);
  } catch (error) {
    console.log(error.name); // "TypeError"
  }
  // Numbers are converted to strings: "item42".includes(42) is true.
}

// 08. startsWith(searchString, position = 0)
// Purpose: test a prefix, optionally starting at a later position.
// Returns: boolean. Original unchanged. Case-sensitive; regex -> TypeError.
{
  console.log("JavaScript".startsWith("Java")); // true
  console.log("JavaScript".startsWith("Script", 4)); // true
  console.log("JavaScript".startsWith("java")); // false
  console.log("abc".startsWith("")); // true
  const config = { url: "https://example.com" };
  console.log(config.url.startsWith("https://")); // true
}

// 09. endsWith(searchString, endPosition = length)
// Purpose: test a suffix. endPosition limits which prefix of the string to inspect.
// Returns: boolean. Original unchanged. Case-sensitive; regex -> TypeError.
// endPosition is an END position, not a search starting position.
{
  console.log("report.pdf".endsWith(".pdf")); // true
  console.log("JavaScript".endsWith("Java", 4)); // true: inspect "Java" only.
  console.log("report.PDF".endsWith(".pdf")); // false
  const file = { name: "photo.PNG" };
  console.log(file.name.toLowerCase().endsWith(".png")); // true
  console.log("abc".endsWith("")); // true
}

// 10. indexOf(searchString, position = 0)
// Purpose: get the FIRST starting index of a substring. Returns: index or -1.
// Original unchanged. Case-sensitive. String search, not a regex search.
// Never use the index alone as a boolean: 0 is falsy, -1 is truthy.
{
  console.log("banana".indexOf("an")); // 1
  console.log("banana".indexOf("an", 2)); // 3
  console.log("banana".indexOf("z")); // -1
  console.log("banana".indexOf("b") !== -1); // true
  const user = { email: "sakib@example.com" };
  const at = user.email.indexOf("@");
  console.log(user.email.slice(0, at)); // "sakib"
  // Check at !== -1 before slicing; slice(0, -1) would remove the last character.
}

// 11. lastIndexOf(searchString, position = Infinity)
// Purpose: get the LAST starting index at/before position, searching backwards.
// Returns: index or -1. Original unchanged. Case-sensitive; no callback.
{
  console.log("banana".lastIndexOf("an")); // 3
  console.log("banana".lastIndexOf("an", 2)); // 1
  console.log("banana".lastIndexOf("z")); // -1
  const file = { name: "report.backup.pdf" };
  const dot = file.name.lastIndexOf(".");
  console.log(file.name.slice(dot + 1)); // "pdf"
  // Guard dot !== -1 if a filename might not contain any dot.
}

// 12. toLowerCase()
// Purpose: convert text to lowercase using default Unicode casing.
// Returns: string. Original unchanged. No locale or callback parameter.
{
  const input = "JavaScript";
  console.log(input.toLowerCase()); // "javascript"
  console.log(input); // "JavaScript"
  const user = { email: "SAKIB@EXAMPLE.COM" };
  console.log(user.email.toLowerCase()); // "sakib@example.com"
  // Casing is useful for simple comparisons, but human-language case matching
  // can need locale-aware rules. See the locale methods below.
}

// 13. toUpperCase()
// Purpose: convert text to uppercase using default Unicode casing.
// Returns: string. Original unchanged. Conversion can CHANGE the string's length.
{
  console.log("hello".toUpperCase()); // "HELLO"
  console.log("straße".toUpperCase()); // "STRASSE": ß expands into SS.
  const getCode = () => "bd";
  console.log(getCode().toUpperCase()); // "BD"
}

// 14. toLocaleLowerCase(locales?)
// Purpose: lowercase text with locale-specific rules. Returns: string.
// Original unchanged. Pass a locale explicitly when the distinction matters.
// Locale identifiers are strings such as "en-US" or "tr"; invalid ones can throw.
{
  console.log("I".toLocaleLowerCase("en-US")); // "i"
  console.log("I".toLocaleLowerCase("tr")); // "ı": Turkish dotless i.
  const user = { name: "İPEK" };
  console.log(user.name.toLocaleLowerCase("tr")); // "ipek"
}

// 15. toLocaleUpperCase(locales?)
// Purpose: uppercase text with locale-specific rules. Returns: string.
// Original unchanged. This is not always the inverse of lowercasing.
{
  console.log("i".toLocaleUpperCase("en-US")); // "I"
  console.log("i".toLocaleUpperCase("tr")); // "İ": Turkish dotted capital I.
  const getName = () => "ipek";
  console.log(getName().toLocaleUpperCase("tr")); // "İPEK"
}

// 16. trim()
// Purpose: remove whitespace from BOTH ends. Returns: string.
// Original unchanged. Includes whitespace such as spaces, tabs, and newlines.
// Does not remove internal spaces, and is not a method for removing arbitrary text.
{
  console.log("  hello world  ".trim()); // "hello world"
  console.log("\n\t JS \t\n".trim()); // "JS"
  const user = { name: "  Sakib  " };
  user.name = user.name.trim(); // Assigning updates the object's property.
  console.log(user.name); // "Sakib"
  console.log("\u200Bhello\u200B".trim().length); // 7: zero-width space is not trim whitespace.
}

// 17. trimStart()
// Purpose: remove whitespace from the LEFT end only. Returns: string.
// Original unchanged. No argument to specify which characters to remove.
{
  console.log("  hello  ".trimStart()); // "hello  "
  const message = { text: "\n  Welcome " };
  console.log(message.text.trimStart()); // "Welcome "
  // trimLeft() is an alias; prefer the direction-neutral name trimStart().
}

// 18. trimEnd()
// Purpose: remove whitespace from the RIGHT end only. Returns: string.
// Original unchanged. Internal whitespace remains.
{
  console.log("  hello  ".trimEnd()); // "  hello"
  const getLine = () => "  code\n";
  console.log(getLine().trimEnd()); // "  code"
  // trimRight() is an alias; prefer trimEnd().
}

// REGEX PRIMER for the following methods:
//   /cat/    matches literal "cat".
//   /cat/g   g = global: match all occurrences where the method uses it.
//   /cat/i   i = ignore case.
//   /\d+/g   \d = digit; + = one or more; captures digit groups throughout text.
//   /(\w+)/  parentheses capture text; \w is an ASCII word character here.
//   u = Unicode-aware regex handling. A regex is an object, not a string.

// 19. replace(pattern, replacement)
// Purpose: replace a match. Returns: string. Original unchanged.
// String pattern: replaces FIRST occurrence. Regex with /g: replaces all matches.
// Replacement can be a STRING or a FUNCTION. Callback receives
// (match, capture1, capture2, ..., offset, originalString[, namedGroups]).
// Callback's returned value is used as the replacement text.
{
  console.log("cat and cat".replace("cat", "dog")); // "dog and cat"
  console.log("cat and CAT".replace(/cat/gi, "dog")); // "dog and dog"
  console.log("hello".replace("missing", "X")); // "hello": no match.
  console.log("Sakib Alok".replace(/(\w+) (\w+)/, "$2, $1")); // "Alok, Sakib"
  // $1/$2 insert captured groups; $& inserts the full match; $$ inserts a dollar.
  console.log("cat".replace("cat", "[$&]")); // "[cat]"
  console.log("Price: 20".replace(/\d+/, match => Number(match) * 2)); // "Price: 40"
  const labels = { JS: "JavaScript", CSS: "Cascading Style Sheets" };
  console.log("Learn JS and CSS".replace(/JS|CSS/g, match => labels[match]));
  // "Learn JavaScript and Cascading Style Sheets"
  function bracketWord(match) { return `[${match}]`; }
  console.log("red blue".replace(/\w+/g, bracketWord)); // "[red] [blue]"
  // Callback receives the match, not just zero arguments. A callback that forgets
  // return produces replacement text "undefined". async callbacks produce Promise
  // objects, which become text such as "[object Promise]"; replace does not await.
}

// 20. replaceAll(pattern, replacement)
// Purpose: replace EVERY match. Returns: string. Original unchanged.
// A string pattern is literal; regex patterns MUST have g or TypeError is thrown.
// Supports the same replacement strings and callback functions as replace.
{
  console.log("cat and cat".replaceAll("cat", "dog")); // "dog and dog"
  console.log("a.b.a".replaceAll(".", "-")); // "a-b-a": dot is literal here.
  console.log("a.b.a".replaceAll(/./g, "-")); // "-----": regex dot matches each character.
  const prices = { small: 10, large: 20 };
  console.log("small + large".replaceAll(/small|large/g, match => prices[match])); // "10 + 20"
  console.log("ab".replaceAll("", "-")); // "-a-b-": inserts at each code-unit boundary.
  try {
    "cat cat".replaceAll(/cat/, "dog");
  } catch (error) {
    console.log(error.name); // "TypeError": missing g flag.
  }
  // Advanced object behavior: regex objects implement Symbol.replace. A custom
  // object can implement that hook too; these methods delegate matching to it.
  // Plain objects have no such hook and are normally converted to strings.
}

// 21. split(separator?, limit?)
// Purpose: break a string into parts. Returns: ARRAY of strings (ordinary cases).
// Original unchanged. separator can be a string or regex. limit caps the number
// of returned pieces; it does NOT put all leftover text into the last piece.
// split does not accept a callback mapper; use .split(...).map(callback) instead.
{
  console.log("JS,HTML,CSS".split(",")); // ["JS", "HTML", "CSS"]
  console.log("JS,HTML,CSS".split(",", 2)); // ["JS", "HTML"]: CSS is discarded.
  console.log("hello".split()); // ["hello"]: no separator.
  console.log("hello".split("")); // ["h", "e", "l", "l", "o"]
  console.log("a,,b,".split(",")); // ["a", "", "b", ""]
  console.log("".split(","), "".split("")); // [""], []
  console.log("one two\tthree".split(/\s+/)); // ["one", "two", "three"]
  console.log("a1b2".split(/(\d)/)); // ["a", "1", "b", "2", ""]: captures are included.
  const user = { tags: " js, css , html " };
  console.log(user.tags.split(",").map(tag => tag.trim())); // ["js", "css", "html"]
  console.log("😀".split("").length); // 2: splits UTF-16 units; Array.from("😀") has length 1.
  // Regex objects use Symbol.split; advanced custom objects can supply that hook.
}

// 22. concat(...strings)
// Purpose: combine strings. Returns: string. Original unchanged.
// Arguments are converted to text. Plain objects generally become "[object Object]";
// function arguments become function source text, not their returned values.
{
  console.log("Hello".concat(" ", "Sakib", "!")); // "Hello Sakib!"
  console.log("ID: ".concat(42)); // "ID: 42"
  const user = { name: "Mina" };
  console.log("Hello ".concat(user.name)); // "Hello Mina"
  const getName = () => "Rafi";
  console.log("Hello ".concat(getName())); // "Hello Rafi": call the function first.
  // Often easier to read: `Hello ${user.name}!` or "Hello " + user.name.
}

// 23. repeat(count)
// Purpose: repeat a string count times. Returns: string. Original unchanged.
// Fractional counts are truncated first. A negative integer or Infinity throws
// RangeError; a small negative fraction such as -0.5 truncates to zero.
// Very large results can also exceed the runtime's string size limit.
{
  console.log("ha".repeat(3)); // "hahaha"
  console.log("ha".repeat(0)); // ""
  console.log("ha".repeat(2.9)); // "haha"
  console.log("ha".repeat(-0.5)); // ""
  const style = { symbol: "*", width: 5 };
  console.log(style.symbol.repeat(style.width)); // "*****"
  try {
    "ha".repeat(-1);
  } catch (error) {
    console.log(error.name); // "RangeError"
  }
}

// 24. padStart(targetLength, padString = " ")
// Purpose: add padding to the LEFT until reaching targetLength code units.
// Returns: string. Original unchanged. Does not truncate an already long string.
// Padding repeats and is cut to fit. Empty padString adds nothing.
{
  console.log("7".padStart(3, "0")); // "007"
  console.log("42".padStart(6, "ab")); // "abab42"
  console.log("hello".padStart(3, "0")); // "hello"
  console.log("7".padStart(3, "")); // "7"
  const user = { id: 42 };
  console.log(String(user.id).padStart(5, "0")); // "00042"
  // Numbers have no padStart method; explicitly convert the number to a string.
}

// 25. padEnd(targetLength, padString = " ")
// Purpose: add padding to the RIGHT. Returns: string. Original unchanged.
// Same target-length and padding rules as padStart. Padding counts code units.
{
  console.log("JS".padEnd(5, ".")); // "JS..."
  console.log("x".padEnd(6, "ab")); // "xababa"
  const item = { name: "Pen", price: 10 };
  console.log(item.name.padEnd(8, ".") + item.price); // "Pen.....10"
  // Display width can differ from string.length with emoji or combining characters.
}

// 26. match(regexp)
// Purpose: extract regex matches. Returns: a match ARRAY or null.
// Original unchanged. Without g: result[0] is full match, following items are
// captures; .index is the match position, .groups holds named captures if any.
// With g: returns all full matches, but not capture details for each match.
// Regex is an object; an ordinary string argument is treated as regex source.
{
  console.log("Order 12, item 34".match(/\d+/g)); // ["12", "34"]
  const result = "Order: 42".match(/Order: (\d+)/);
  console.log(result[0], result[1], result.index); // "Order: 42", "42", 0
  console.log("hello".match(/\d+/)); // null
  const user = { code: "USER-123" };
  console.log(user.code.match(/\d+/)?.[0]); // "123"
  // Use optional chaining or check for null before reading a failed match.
  console.log("a.b".match("." )[0]); // "a": "." is regex source, not a literal dot.
}

// 27. matchAll(regexp)
// Purpose: get EVERY regex match WITH its capture details.
// Returns: iterator of match arrays. Original unchanged. No matches -> empty iterator.
// Regex argument MUST have g; passing a non-global regex throws TypeError.
// Each match array has properties such as .index and .groups. Iterator is consumed.
{
  const text = "Sakib:20 Mina:25";
  const iterator = text.matchAll(/(\w+):(\d+)/g);
  const users = Array.from(iterator, match => ({
    name: match[1],
    age: Number(match[2]),
  }));
  console.log(users); // [{ name: "Sakib", age: 20 }, { name: "Mina", age: 25 }]
  console.log([...iterator]); // []: already consumed by Array.from.
  console.log([..."hello".matchAll(/\d+/g)]); // []
  try {
    "a1".matchAll(/\d/);
  } catch (error) {
    console.log(error.name); // "TypeError"
  }
  // Strings are treated as regex source too; use an explicit /.../g for clarity.
}

// 28. search(regexp)
// Purpose: find the starting position of the FIRST regex match.
// Returns: index or -1. Original unchanged. g does not turn this into a list.
// Compare indexOf for literal text searching; search for a regex condition.
{
  console.log("Room 42".search(/\d/)); // 5
  console.log("hello".search(/\d/)); // -1
  console.log("HELLO".search(/hello/i)); // 0
  const user = { username: "sakib_42" };
  console.log(user.username.search(/\d/)); // 6
  // With a string argument, regex syntax still applies: search(".") matches any character.
}

// 29. normalize(form = "NFC")
// Purpose: bring canonically/compatibly equivalent Unicode text into a chosen form.
// Returns: string. Original unchanged. Forms: NFC, NFD, NFKC, NFKD.
// NFC usually composes characters; NFD decomposes. Invalid form -> RangeError.
// Compatibility forms NFKC/NFKD can change stylistic/format distinctions.
{
  const composed = "\u00E9"; // é as one code point.
  const decomposed = "e\u0301"; // e + combining accent.
  console.log(composed === decomposed); // false: different sequences.
  console.log(composed.normalize() === decomposed.normalize()); // true
  console.log(composed.normalize("NFD").length); // 2
  const user = { name: decomposed };
  console.log(user.name.normalize("NFC").length); // 1
  console.log("\uFB00".normalize("NFKC")); // "ff": the ﬀ ligature becomes two letters.
  try {
    "hello".normalize("INVALID");
  } catch (error) {
    console.log(error.name); // "RangeError"
  }
  // Normalizing does not automatically lowercase text or remove accents.
}

// 30. localeCompare(compareString, locales?, options?)
// Purpose: compare strings using human-language sorting rules.
// Returns: NEGATIVE / ZERO / POSITIVE number. Original unchanged.
// Do not depend on exactly -1 or 1; only the sign is specified.
// A useful callback for array sort/toSorted, especially with object string fields.
{
  console.log("apple".localeCompare("banana", "en") < 0); // true
  console.log("same".localeCompare("same", "en") === 0); // true
  console.log("file2".localeCompare("file10", "en", { numeric: true }) < 0); // true
  const users = [{ name: "Mina" }, { name: "Sakib" }, { name: "Alok" }];
  const sorted = users.toSorted((a, b) => a.name.localeCompare(b.name, "en"));
  console.log(sorted.map(user => user.name)); // ["Alok", "Mina", "Sakib"]
  console.log("A".localeCompare("a", "en", { sensitivity: "base" }) === 0); // true
  // Locale rules/data can differ across environments. Set a locale deliberately.
}

// 31. toString()
// Purpose: obtain a primitive string from a String primitive or wrapper.
// Returns: primitive string. Original unchanged. Accepts no meaningful parameters.
// String.prototype.toString expects a string/String wrapper receiver; it is not
// a universal object serializer. Plain objects have a DIFFERENT toString method.
{
  const wrapper = new String("hello");
  console.log(wrapper.toString(), typeof wrapper.toString()); // "hello", "string"
  console.log("hello".toString()); // "hello"
  console.log(({ name: "Sakib" }).toString()); // "[object Object]": Object's method.
  // A function's own toString() gives source text, not the function's return value.
  const getName = () => "Sakib";
  console.log(getName().toString()); // "Sakib": call first to get the string.
}

// 32. valueOf()
// Purpose: obtain the primitive value of a String wrapper.
// Returns: primitive string. Original unchanged. Usually unnecessary if you
// already use primitive strings. Different object types have their own valueOf.
{
  const wrapper = new String("JS");
  console.log(wrapper.valueOf()); // "JS"
  console.log(wrapper.valueOf() === "JS"); // true
  console.log("JS".valueOf()); // "JS"
  const user = { name: "Mina" };
  console.log(user.name.valueOf()); // "Mina"
}

// 33. String.fromCharCode(...codeUnits) — STATIC: call on String, not a string.
// Purpose: build text from UTF-16 code units. Returns: string.
// Inputs are converted to 16-bit code units, so large values are truncated.
// Does not treat a number above 65535 as a complete Unicode code point.
{
  console.log(String.fromCharCode(65, 66, 67)); // "ABC"
  console.log(String.fromCharCode(0xD83D, 0xDE00)); // "😀": supply both surrogate units.
  console.log(String.fromCharCode(0x1F600) === "😀"); // false: value was truncated.
  const user = { codes: [83, 97, 107, 105, 98] };
  console.log(String.fromCharCode(...user.codes)); // "Sakib"
}

// 34. String.fromCodePoint(...codePoints) — STATIC.
// Purpose: build text from full Unicode code points. Returns: string.
// Range: integers from 0 to 0x10FFFF. Invalid numbers throw RangeError.
// This method can create multiple UTF-16 units for one supplied code point.
{
  console.log(String.fromCodePoint(65, 128512, 66)); // "A😀B"
  console.log(String.fromCodePoint(0x1F600)); // "😀"
  console.log(String.fromCodePoint(0x1F600).length); // 2
  const getCode = () => 65;
  console.log(String.fromCodePoint(getCode())); // "A"
  try {
    String.fromCodePoint(1.5);
  } catch (error) {
    console.log(error.name); // "RangeError"
  }
}

// 35. String.raw — STATIC TEMPLATE TAG.
// Purpose: preserve the raw backslashes in the literal parts of a template.
// Returns: string. Normally used as String.raw`...`, without ordinary call parentheses.
// Interpolated ${...} values still evaluate and convert to strings normally.
// String.raw does not turn already-interpreted interpolation values back into raw text.
{
  const raw = String.raw`line1\nline2`;
  console.log(raw); // "line1\\nline2": literal backslash + n, not a newline.
  console.log(raw.includes("\n")); // false
  const folder = { name: "notes" };
  console.log(String.raw`C:\study\notes`); // "C:\\study\\notes" as escaped notation.
  console.log(String.raw`folder: ${folder.name}\n`); // "folder: notes\\n"
  const getName = () => "Sakib";
  console.log(String.raw`Hello ${getName()}`); // "Hello Sakib"
  // Normal templates use \n as a newline; String.raw keeps that escape written out.
}

// 36. isWellFormed() — newer method; check runtime support when needed.
// Purpose: check for lone UTF-16 surrogate units. Returns: boolean.
// Original unchanged. Does NOT check spelling, JSON syntax, or visible layout.
{
  console.log("hello".isWellFormed()); // true
  console.log("😀".isWellFormed()); // true: valid surrogate pair.
  console.log("\uD800".isWellFormed()); // false: lone leading surrogate.
  const item = { text: "hello" };
  console.log(item.text.isWellFormed()); // true
}

// 37. toWellFormed() — newer method; check runtime support when needed.
// Purpose: replace each lone surrogate with U+FFFD (the replacement character).
// Returns: string. Original unchanged. Already well-formed text keeps its content.
{
  console.log("hello".toWellFormed()); // "hello"
  console.log("\uD800".toWellFormed()); // "�"
  const item = { text: "x\uD800y" };
  const cleaned = item.text.toWellFormed();
  console.log(cleaned, cleaned.isWellFormed()); // "x�y", true
  console.log(item.text.isWellFormed()); // false: the original property is unchanged.
}

// PRACTICAL EXAMPLE A: method chaining and updating an object's property.
{
  const user = { username: "  SAKIB NISAT  " };
  user.username = user.username.trim().toLowerCase().replaceAll(" ", "_");
  console.log(user.username); // "sakib_nisat"
  // Every step gets the previous returned STRING. split returns an ARRAY instead,
  // so after split use array methods, and use join to turn it back into a string.
  console.log("  js, css, html  ".trim().split(",").map(item => item.trim()).join(" | "));
  // "js | css | html"
}

// PRACTICAL EXAMPLE B: functions returning strings vs replacement callbacks.
{
  function getGreeting(user) { return `Hello ${user.name}`; }
  const user = { name: "Sakib" };
  console.log(getGreeting(user).toUpperCase()); // "HELLO SAKIB"

  function doubleNumber(match) { return String(Number(match) * 2); }
  console.log("10 pens, 3 books".replace(/\d+/g, doubleNumber)); // "20 pens, 6 books"
  // Here we PASS doubleNumber, because replace calls it for each match.
  // In getGreeting(user).toUpperCase(), we CALL getGreeting ourselves first.

  console.log("a".replace("a", () => "$&")); // "$&": callback result is literal text.
  console.log("a".replace("a", "$&")); // "a": replacement STRING expands $&.
  console.log("a".replace("a", async () => "b")); // "[object Promise]": not awaited.
}

/*
CHOOSING A METHOD DURING REVISION
  Need a substring?                         slice (negative indexes supported)
  Need the final code unit?                 at(-1)
  Need a substring's presence / location?   includes / indexOf
  Need prefix / suffix checks?              startsWith / endsWith
  Need outer whitespace removed?            trim / trimStart / trimEnd
  Need first / all replacements?            replace / replaceAll
  Need an array of pieces?                  split
  Need regex matching / positions?          match / matchAll / search
  Need formatting width?                   padStart / padEnd
  Need equivalent Unicode forms?           normalize
  Need human-language sorting?             localeCompare

FINAL PITFALLS
  A string method may return a boolean, number, array, iterator, or string.
  String methods do not mutate characters; object properties update only on assignment.
  new String("") is a truthy object; use primitive strings for ordinary work.
  charAt(outOfRange) -> ""; at(outOfRange) -> undefined.
  indexOf/search return -1 when absent; match returns null when absent.
  matchAll/replaceAll require g when passed a regex.
  split("") is not a complete solution for counting visible Unicode characters.
  trim removes whitespace, not arbitrary prefixes/suffixes.
  Functions are called automatically only where a method's API expects a callback.
  String(object) is string conversion; JSON.stringify(object) is JSON serialization.
*/
