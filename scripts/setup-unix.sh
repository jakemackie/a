#!/bin/bash
git config --local alias.update-submodules "submodule update --init --recursive"
git config --local alias.sync "fetch --all && pull --rebase"

# Check if the alias was successfully added
if git config alias.update-submodules > /dev/null; then
    git update-submodules
    echo "Git aliases have been successfully configured!"
else
    echo "Failed to configure Git aliases."
fi
