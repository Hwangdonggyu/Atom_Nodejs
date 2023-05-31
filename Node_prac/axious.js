const axios = require('axios');
const prisma = require('./src/database');

const fetchData = async () => {
  try {
    for (let page = 19; page <= 183; page++) {
      const url = `https://openapi.gg.go.kr/ChildPlayFacility?KEY=7b1b0eb5011e475da06153c96861b2a9&Type=json&pindex=${page}`;
      const response = await axios.get(url);
      const data = response.data.ChildPlayFacility[1].row
      for (const row of data) {
        const lat_n = parseFloat(row.REFINE_WGS84_LAT);
        const long_n = parseFloat(row.REFINE_WGS84_LOGT);
        
        if (isNaN(lat_n) || isNaN(long_n)) {
          continue; // Skip if lat or long is NaN
        }
        await prisma.map.create({
          data: {
            lat: lat_n,
            long: long_n,
            title: row.PLAY_FACLT_NM,
            address: row.REFINE_LOTNO_ADDR,
            install_date: new Date(row.INSTL_DE),
            pri_pub_div: row.PRVATE_PUBL_DIV_NM,
            in_out_div: row.INOUTDR_DIV_NM,
          },
        });
      }
    }

    console.log('데이터를 저장했습니다.');
  } catch (error) {
    console.error('API 요청 오류:', error);
  } finally {
    await prisma.$disconnect();
  }
};

fetchData();
