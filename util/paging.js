const paging = (arr, stt) => {
  //console.log("đang ở page : ", stt);
  let index = stt || 1;
  let start = -20 + 20 * index;
  let end = 0 + 20 * index;

  let newArr = arr.slice(start, end);
  //javascript có 2 cái là splice, slice ,split (thường dùng cho chuỗi string chứ ko phải mảng array)

  return {
    results: newArr,
    page: index,
    total_pages: Math.ceil(arr.length / 20),
  };
};

module.exports = paging;
// trong BackEnd muốn xuất file js thì phải dùng module, ko dùng import và export như ReactJS được
