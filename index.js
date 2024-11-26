// Grab global modules
const fs = require('fs');
const path = require('path');
const os = require('os');
const { format } = require('date-fns');

// Get the current date and time for the save folder name
const day = new Date().getDay();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const time = format(new Date(), `MM-dd-yyyy__HH'h'mm'm'`);

// Create paths
const desktopPath = path.join(os.homedir(), 'Desktop')
const savesPath = path.join(desktopPath, 'savegames')
const folderPath = path.join(savesPath, `${days[day]}__${time}`);

let outlawsPath = path.join('C:', 'Program Files (x86)', 'Ubisoft', 'Ubisoft Game Launcher', 'savegames');
if(fs.existsSync(outlawsPath)) {
    const launcherUUID = fs.readdirSync(outlawsPath)[0];
    const saveLocation = fs.readdirSync(path.join(outlawsPath, launcherUUID))[0];
    outlawsPath = path.join(outlawsPath, launcherUUID, saveLocation);
}
const files = fs.readdirSync(outlawsPath);

if (!fs.existsSync(savesPath)) {
    fs.mkdir(savesPath, (err) => {
        if (err) throw err;
        console.log('Folder created successfully!');
    });
}
if (!fs.existsSync(folderPath)) {
    fs.mkdir(folderPath, (err) => {
        if (err) throw err;
        console.log('Folder created successfully!');
    });
} else {
    console.error('Avoid multiple savegames in 1 minute window');
}
for(file of files) {
    let currentPath = path.join(outlawsPath, file);
    let data = fs.readFileSync(currentPath);
    let thisPath = path.join(folderPath, `${file}.save`);

    fs.writeFileSync(thisPath, data, (err) => {
        if (err) throw err;
        console.log();
    });
}