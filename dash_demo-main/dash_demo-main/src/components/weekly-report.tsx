import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
    {
        name: "SUN",
        total: 9,
    },
    {
        name: "MON",
        total: 8,
    },
    {
        name: "TUE",
        total: 6,
    },
    {
        name: "WED",
        total: 10,
    },
    {
        name: "THU",
        total: 2,
    },
    {
        name: "FRI",
        total: 1,
    },
    {
        name: "SAT",
        total: 0,
    },
]

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#3E1F04"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#3E1F04"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="total" fill="#F57C13" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}