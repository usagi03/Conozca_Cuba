export const reportopt = {
  path: "/app/backend/lib/jasperreports-5.6.0",
  reports: {
    InactiveHotel: {
      jasper: "backend\reportReport_8_list_of_inactive_hotels.jasper",
      //Este formato se modifica para establecer la conexion a la base de datos .Cmbiar el nombre y ruta de los reportes.
      conn: "jdbc:postgresql://localhost:5434/Conozco_Cuba?user=postgres&password=CamilaBD",
    },
  },
};
