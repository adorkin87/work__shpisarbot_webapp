export default function (serverDate: string): { date: string; time: string } {
    const y = serverDate.slice(0, 4);
    const m = serverDate.slice(5, 7);
    const d = serverDate.slice(8, 10);
    const hour = serverDate.slice(11, 13);
    const min = serverDate.slice(14, 16);
    return { date: `${d}.${m}.${y}`, time: `${hour}:${min}` };
}
