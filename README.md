# jakestack

My own fullstack implementation.

> Please ensure you have both [Node](https://nodejs.org/en) and [GO](https://go.dev/) installed on your system.

---

## Setup

### Clone the repo

Start by cloning the base repository.

```bash
git clone https://github.com/jakemackie/jakestack
cd jakestack
```

### Scripts

Now you'll have to fetch the submodules, which I've made easier to do for you.

If you're on Windows, run

```bash
./scripts/setup-win.bat
```

If you're on a unix-based system like Linux or MacOS, run

```bash
./scripts/setup-unix.sh
```

### Running the project

For the server

```bash
cd server
go run main.go
```

For the client

```bash
cd client
npm install
npm run dev
```
