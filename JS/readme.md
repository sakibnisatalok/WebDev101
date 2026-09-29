

## Lexical vs Functional vs Block scope :::

| **Feature**             | **Lexical Scope**                          | **Function Scope**                 | **Block Scope**                    |
| ----------------------- | ------------------------------------------ | ---------------------------------- | ---------------------------------- |
| **Category**            | Scope **resolution rule** (static ruleset) | Scope **boundary** (unit of space) | Scope **boundary** (unit of space) |
| **Defined By**          | Physical placement of code in file         | `function () {}` statements        | Curly braces `{}`                  |
| **Keywords**            | N/A (Governs all declarations)             | `var` (plus `let`/`const`)         | `let`, `const`, `class`            |
| **Lookup Direction**    | Inside → Outside (Static chain)            | Confined within function           | Confined within block              |
| **Runtime Sensitivity** | Independent of call stack                  | Created on function entry          | Created on block entry             |







