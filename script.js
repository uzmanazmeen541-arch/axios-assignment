const axios = require('axios');

const API_URL = 'https://gist.githubusercontent.com/Shadid12/18642d735214920921f4f470300be11e/raw/6dcf7b456c40f110c313bbb1678474b01756bc1a/restaurants.json';

async function getRestaurantAverageGrades() {
  try {
    const response = await axios.get(API_URL);
    const restaurants = response.data;

    const result = restaurants.map(r => {
      // filter out null grades - this fixes your error "Cannot read properties of null"
      const validGrades = r.grades.filter(g => g && g.score != null);
      const total = validGrades.reduce((sum, g) => sum + g.score, 0);
      
      return {
        name: r.name,
        averageGrade: validGrades.length ? total / validGrades.length : 0
      };
    });

    console.log(result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getRestaurantAverageGrades();
