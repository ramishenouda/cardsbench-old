<h1 align="center">
  <a href="https://cardsbench.herokuapp.com/">
    CardsBench
  </a>
</h1>

<p align="center">
  <strong>A web application to share notes and track issues based on Trello.</strong><br>
</p>

<p align="center">
  <a href="https://github.com/ramishenouda/cardsbench/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="CardsBench, Released under MIT License." />
  </a>
  <img src="https://img.shields.io/badge/Made%20with-ASP.net & React-1f425f.svg" alt="Made with, ASP.NET, and React" />
  <a href="https://cardsbench.herokuapp.com/">
    <img src="https://img.shields.io/badge/Website-CardsBench-brightgreen.svg" alt="CardsBench's link" />
  </a>
</p>

A web application to share notes and track issues based on Trello.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- npm

```
https://www.npmjs.com/get-npm
```

- .NET Core SDK

```
https://dotnet.microsoft.com/download
```

### Installing

1. Clone the repo.

```
git clone https://github.com/ramishenouda/cardsbench.git
```

2. Run npm install inside cardsbench/cards-bench-spa to install npm packages.

```
npm install
```

3. Use nuget package manager to install the ASP.NET Packages, packages can be found in cardsbench/CardsBench.API.csproj file.
```
dotnet restore
```
4. Use the command dotnet run to, to run the backend server. 

```
dotnet run
```

5. Use the command npm run start, to run the front end.   

```
npm run start
```

6. Open your browser navigate to http://localhost:3000/

```
Enjoy.
```

## Built With

* [React](https://reactjs.org/).
* [ASP.NET core](https://dotnet.microsoft.com/apps/aspnet).
* [Bootstrap](https://getbootstrap.com/).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
