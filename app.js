'use strict';

$.ajax({
  url: 'https://api.mailchat.net/test/chat.get',
  method: 'GET',
  dataType: 'json',
  success: function (dataAnswer) {
    let chats = '';
    let data = dataAnswer['response']['subjects'];
    // console.log(data);
    for (let key in data) {
      chats +=
        '<div class="chat-list-block" onclick="showMassages(' + data[key].id + ', \'' + data[key].title + '\')">' +
        '<h6>' + data[key].title + '</h6>' +
        '<p class="chat-list-block-massage">' + data[key].message_content + '</p>' +
        '</div>'
    }
    $('.chat-list').append(chats);
  }
});

function showMassages(id, name) {
  $.ajax({
    url: 'https://api.mailchat.net/test/message.get?id= ' + id,
    method: 'GET',
    dataType: 'json',
    success: function (dataAnswer) {
      let messages = '';
      let data = dataAnswer['response']['messages'];
      console.log(data);

      // console.log(new Date(1603269272));
      let tempDate = new Date(1603269272);
      // console.log(tempDate.getDate());
      // console.log(tempDate.getDay());
      // console.log(tempDate.getFullYear());

      let massDate = new Date(data[0].date);
      messages +=
        '<div class="date">' +
        '<p class="date-content">' + massDate.getDate() + ' ' + getMonth(massDate.getMonth()) + '</p>' +
        '</div>';

      console.log(massDate);
      for (let key in data) {
        let curmassDate = new Date(data[key].date);
        if (!(massDate.getDate() === curmassDate.getDate() && massDate.getMonth() === curmassDate.getMonth() && massDate.getFullYear() === curmassDate.getFullYear())) {
          messages +=
            '<div class="date">' +
            '<p class="date-content">' + massDate.getDate() + ' ' + getMonth(massDate.getMonth()) + '</p>' +
            '</div>';
        }
        if (data[key].you) {
          messages +=
            '<div class="message-true">' +
            '<div class="message-content-true">' +
          '<p>' + data[key].content + '</p>' +
          '<span>' + (curmassDate.getHours() + 1) + ':' + (curmassDate.getMinutes() + 1) + '</span>' +
          '</div>' +
          '</div>'
        } else {
          messages +=
          '<div class="message-false">' +
            '<h6>' + name + '</h6>' +
            '<div class="message-content-false">' +
              '<p>' + data[key].content + '</p>' +
              '<span>' + (curmassDate.getHours() + 1) + ':' + (curmassDate.getMinutes() + 1) + '</span>' +
            '</div>' +
          '</div>'
        }
      }
      $('.chat-messages-show').html(messages);
    }
  });
}

function getMonth(month) {
  switch (month) {
    case 0:
      return 'января'
    case 1:
      return 'февраля'
    case 2:
      return 'марта'
    case 3:
      return 'апреля'
    case 4:
      return 'мая'
    case 5:
      return 'июня'
    case 6:
      return 'июля'
    case 7:
      return 'августа'
    case 8:
      return 'сентября'
    case 9:
      return 'октября'
    case 10:
      return 'ноября'
    case 11:
      return 'декабря'
  }
}