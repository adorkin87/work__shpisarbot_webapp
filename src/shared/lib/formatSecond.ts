export default function (sec: number): string {
    return `${Math.floor(sec / 60) < 10 ? '0' + Math.floor(sec / 60) : Math.floor(sec / 60)}:${sec % 60 < 10 ? '0' + (sec % 60) : sec % 60}`;
}
