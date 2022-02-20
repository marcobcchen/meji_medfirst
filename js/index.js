$(function(){
  let nowCity = '';
  let nowZone = '';
  let storeData;
  let areaData;

  async function fetchStoreJSON() {
    const response = await fetch('/data/store.json');
    const stores = await response.json();
    return stores;
  }

  async function fetchAreaJSON() {
    const response = await fetch('/data/area.json');
    const area = await response.json();
    return area;
  }

  function getStoreData(){
    fetchStoreJSON().then(function(stores){
      storeData = stores;
      createCitySelect();
    });
  }
  
  function searchStore(city, zone){
    let searchCity;
    let searchZone;
    // console.log('全部店點：', stores);

    if(city != ''){
      searchCity = storeData.filter(function(store){
        return store.city === city
      });
      console.log('選擇的城市：', searchCity);
      createStore(searchCity);
    }

    if(zone != ''){
      searchZone = searchCity.filter(function(store){
        return store.zone === zone
      });
      console.log('選擇的區域：', searchZone);
      createStore(searchZone);
    }
  }

  function createStore(stores){
    let storeElement = '';

    stores.map(function(store){
      let fullAddress = store.city + store.zone + store.address;
      storeElement +=
      '<div>' +
        '<p>' + store.store + '</p>' +
        '<p>' + store.city + '</p>' +
        '<p>' + store.zone + '</p>' +
        '<p>' + store.address + '</p>' +
        '<a href="https://www.google.com.tw/maps/place/' + fullAddress + '" target="_blank">開啟地圖</a>' +
        '<hr />' +
      '</div>';
    });

    $('#store').empty().append(storeElement);
  }

  function createCitySelect(){
    fetchAreaJSON().then(function(areas){
      let cityElement = '';
      areaData = areas;

      areas.map(function(area, index){
        if(index == 0){
          nowCity = area.city;
          createZoneSelect(nowCity);
        }
        cityElement += '<option value=' + area.city + '>' + area.city + '</option>';
      });

      $('#city').empty().append(cityElement);
    });
  }

  function createZoneSelect(selectedCity){
    let zoneElement = '<option value="">請選擇區域</option>';

    let city = areaData.filter(function(area){
      return area.city == selectedCity
    });

    city[0].zone.map(function(zone){
      zoneElement += '<option value=' + zone + '>' + zone + '</option>';
    });

    $('#zone').empty().append(zoneElement);

    searchStore(nowCity, nowZone);
  }

  function init(){
    getStoreData();

    $('#city').on('change', function(e){
      nowCity = e.target.value;
      nowZone = '';

      createZoneSelect(nowCity);
    });

    $('#zone').on('change', function(e){
      nowZone = e.target.value;

      searchStore(nowCity, nowZone);
    });
  }
  init();
});