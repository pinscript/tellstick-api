const { promisify } = require('util');
const exec = promisify(require('child_process').exec)

const NL = '\n';
const TAB = '\t';
const EQ = '=';

const lines = (value) => value.split(NL).filter(line => line.length)

const keyval = function(input, delim) {
    return {
        key: input.substr(0, input.indexOf(delim)),
        val: input.substr(input.indexOf(delim) + 1)
    }
};

const invoke = async function(args) {
    const out = await exec('tdtool ' + args)
    return out.stdout
};

const listDevices = async function() {
    const out = await invoke('--list-devices')

    const devices = lines(out).map(line => {
        const parts = line.split(TAB)
        const device = { }

        for(var i = 0; i < parts.length; i++) {
            const { key, val } = keyval(parts[i], EQ)
            device[key] = val
        }

        return device
    })

    return { devices }
};

const deviceOn = async function(id) {
    await invoke(`--on ${id}`)
};

const deviceOff = async function(id) {
    await invoke(`--off ${id}`)
};

module.exports = {
    device: {
        list: listDevices,
        on: deviceOn,
        off: deviceOff
    }
}
