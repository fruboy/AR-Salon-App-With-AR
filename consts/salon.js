const salons = [
    {
      id: '1',
      name: 'Silver Salon & SPA',
      location: 'Green street,Central district',
      image: require('../assets/hotel1.jpg'),
      details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
      service:[
        {name:'HairCut' , price:220},
        {name:'Shave' , price:220},
        {name:'shampoo' , price:220},
        {name:'Dryer' , price:220},
      
      ],
      time: {
        from:'10:00',
        to:'23:00',
      },
    },
    {
      id: '2',
      name: 'Bring Salon',
      location: 'Yuki street',
      price: 70,
      image: require('../assets/hotel2.jpg'),
      details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
      service:[
        {name:'HairCut' , price:220},
        {name:'Shave' , price:220},
        {name:'shampoo' , price:220},
        {name:'Dryer' , price:220},
      
      ],
    },
    {
      id: '3',
      name: 'Aluna Salon',
      location: 'Almond street',
      price: 90,
      image: require('../assets/hotel3.jpg'),
      details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
    },
    {
      id: '4',
      name: 'Green Salon',
      location: 'Main street',
      price: 100,
      image: require('../assets/hotel4.jpg'),
      details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
    },
  ];
  
  export default salons;