# Development guidelines
We recommended to follow these guidelines when writing code for this project. These are no strict rules as it is not meant to be counterproductive but for better readability. Follow these general rules as much as you can.

Furthermore, language-specific guidelines are written for C++(14) standards mainly, so for other languages like java and python, please make request to update or write one by your own.

This guideline might be revised on demand.

## General coding style ([Modified from RPCS3 coding style guideline](https://github.com/RPCS3/rpcs3/wiki/Coding-Style))
- Variable naming: lower_case_underscored
  - Globals: `g_*` (Caution: Think twice before using it!)
  - Class members: `m_*`
  - Statics: `s_*` (Caution: Think twice before using it!)
- Template parameter names: CamelCase, or just `T, U, V`...
- Avoiding namespace pollution: Do not use `using namespace std` or any namespaces else. Create your own namespace for your functions and call it via that namespace, e.g. `std::vector<int>::iterator`.
- Avoid #defines, use constant variables instead.
- Put curly-brackets (`{` and `}`) on the next line.
- Put a space after keywords before brackets to differntiate from function calls. For example, `if (something_happens)` vs. `foo(x)`.
- Try to eliminate all compiler warnings from your code.
- Try to use C++ standard data types whenever it's possible (e.g. `std::string` instead of `wxString`).
- Comment every hack you do, every snippet you comment out and every improvable code.
- If you have to comment or place a commented code snippet, include the reasons to do that in the comment.
- Don't use `/**/` for commenting out multiple lines. Use `//` on every line instead. In Visual Studio, for example, you can just select desired lines and use Ctrl+K,C combination to comment every line with `//`, Ctrl+K,U reverts this.
- Ensure that every source file you modify has the newline at the end of file. Every line ends with "newline" and the end of file must have "newline" too, GitHub usually warns about it.
- Use brackets around multi-term ternary operator conditions especially if they occur with other code on the same line. `(x * y) + ((a > b)? c : d)` is more readable than `x * y + a > b? c : d`.
- For every assignment statement, put spaces between each operators and variables except brackets, e.g. `y = x + (2 * (x + 3))`;

## Language/Compiler Versions
- C++
    - g++ version 9.2.0 (GCC)
    - compiler flags:
      - `-Wall -Wextra -g -std=c++14 -O2 -pedantic`
- Python
  - 3.7

## OS
- UNIX
  - Ubuntu 18.04 / 20.04
- Windows 10

## Using github
- DO NOT commit and push directly to main unless you have absolute need to do so. Make a branch to do your own work.
- Keep your work done small and keep commiting for better version control.
- Make pull request(s) to the main. Let other people review your code before merging to the main (as well as solving conflicts).
- If you screwed up anything, undo the commit. You can do this by following [this guide](https://stackoverflow.com/a/31937298). (Caution: Think twice before doing it!)

## Meeting detail
- Weeking meeting  
  - (UTC +8) 2100 - 2200  
  - [click here](https://meet.google.com/vhp-obty-xme)  

- Jam board: 3100 Project Weekly Meeting! (vhp-obty-xme - 2022年1月21日)
  - [click here](https://jamboard.google.com/1PJB25xDlft9iBMjHkKCqzYu3oeu-JygIuYVNXBHqP5Y/viewer?f=1)
 
- project-avalache-meeting-details (google doc)  
  - [click here](https://docs.google.com/document/d/10L72o-qWSt5bQCInW-Q8m7COkIul0dFd-7WDEdRXo0Q/edit)

## Git commend  
  - [Chinese tutoral](https://backlog.com/git-tutorial/tw/stepup/stepup2_1.html) || [English tutoral](https://git-scm.com/docs/git-branch)  
- branch  
  - Build `branch` in shell `$ git branch <branchname>`  
  - Check `branch` in shell `$ git branch`  
  - Goto `branchname` input `$ git checkout <branch>`


- push
  - `$ git add myfile.txt`  
  - `$ git commit -m "commit"`
  - `$ git push`

- pull
  - `$ git pull`

## Task lists  
- [ ] High-Level Design Document  deadline: 23:59:59, 18th Feb, 2022 (Friday).