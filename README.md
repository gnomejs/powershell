# @gnome/env

<div height=30" vertical-align="top">
<image src="https://raw.githubusercontent.com/gnomejs/gnomejs/main/assets/icon.png"
    alt="logo" width="60" valign="middle" />
<span>Work less. Do more. </span>
</div>

## Overview

The `powershell` module provides a simple way to execute
PowerShell scripts or files.

The module relies upon the @gnome/exec module and
has the same basic usage as the `Command` and `ShellCommand` class.

## Basic Usage

```typescript
import { powershell } from "@gnome/powershell";

const cmd = await powershell("Write-Host 'Hello, World!'", { 
        stdout: 'piped', 
        stderr: 'piped'
    });
console.log(await cmd.text());
console.log(cmd.code);

console.log(await powershell("Write-Host 'Hello, World!'").text());

console.log(await powershell("test.ps1").text()); 

// runs powershell command and writes directly to console
await powershell("Write-Host 'I am alive'").run();
```

[MIT License](./LICENSE.md)
