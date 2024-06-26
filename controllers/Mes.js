const getDiasXMes = async (req, res) => {
    const { month, year } = req.params;
    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    try {
        if (month == 2){
            const isLeapYear = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
            res.send(isLeapYear? {"dias": daysPerMonth[month-1] + 1} :  {"dias": daysPerMonth[month-1]});
        } else {
            res.send({"dias": daysPerMonth[month-1]});
        }
    } catch (error) {
        console.error("Error al recuperar el día según el mes: ", error);
        res.status(500).json({error: "Error al recuperar el día según el mes."})
    }
}

module.exports = {
    getDiasXMes,
}