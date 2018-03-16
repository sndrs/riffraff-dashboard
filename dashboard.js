// var blessed = require('blessed'),
//     contrib = require('blessed-contrib'),
//     screen = blessed.screen(),
//     grid = new contrib.grid({ rows: 1, cols: 2, screen: screen });

const fetch = require('node-fetch');
const blessed = require('blessed');
const contrib = require('blessed-contrib');

const render = async () => {
    const data = await fetch(
        'https://api.github.com/repos/guardian/frontend/pulls'
    );
    const prs = await data.json();

    const screen = blessed.screen();
    screen.key(['escape', 'q', 'C-c'], (ch, key) => process.exit(0));

    const grid = new contrib.grid({ rows: 1, cols: 1, screen: screen });

    const PRs = grid.set(0, 0, 0, 0, contrib.table, {
        label: 'PRs',
        columnWidth: [10, 10],
    });

    PRs.setData({
        headers: ['author', 'change'],
        data: prs.map(({ title, user }) => [user.login, title]),
    });

    screen.render();
};

render();

// var line = grid.set(0, 0, 1, 1, contrib.line, {
//     style: {
//         line: 'yellow',
//         text: 'green',
//         baseline: 'black',
//     },
//     xLabelPadding: 3,
//     xPadding: 5,
//     label: 'Stocks',
// });

// var map = grid.set(0, 1, 1, 1, contrib.map, { label: 'Servers Location' });

// var lineData = {
//     x: ['t1', 't2', 't3', 't4'],
//     y: [5, 1, 7, 5],
// };

// line.setData([lineData]);

// screen.key(['escape', 'q', 'C-c'], function(ch, key) {
//     return process.exit(0);
// });

// screen.render();
