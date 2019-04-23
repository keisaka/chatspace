$(function(){
    function buildMESSAGE(message) {
    var messages = $('tbody').append('<tr class="messages" data-id=' + message.id + '><td>' + message.text + '</td><td><a href="/messages/' + message.id + '">Show</a></td><td><a href="/messages/' + message.id +'/edit">Edit</a></td><td><a data-confirm="Are you sure?" rel="nofollow" data-method="delete" href="/messages/' + message.id + '">Destroy</a></td>');
    //'tbody'に'tr'以下のhtml全てをappendする
  }

  $(function(){
    setInterval(update, 10000);
  });
  function update(){
    if($('.messages')[0]){
      var message_id = $('.messages:last').data('id');
    } else {
      var message_id = 0
    }
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        message: { id: message_id }
      },
      dataType: 'json'
    })
    .always(function(data){
      $.each(data, function(i, data){
        buildMESSAGE(data);
      });
    });
  }

  function buildHTML(message){
    var html_common = `<div class= "message" data-message-id="{message.id}">
                        <div class= "message__name">
                          ${message.user_name}
                        </div>
                        <div class= "message__date">
                          ${message.created_at}
                        </div>
                      </div>
                        <div class= "message__text">
                          ${message.content}
                      `
    if(message.image.url == null ){
      var html = html_common + `</div>`
      return html;
    }
    else{
      var html = html_common + `<img class= "lower-message__image", src= ${message.image.url}>
                  </div>`
      return html;
    }
  }

  $('.input').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      console.log(data)
      $('.messages').append(html);
      $('.form__message').val('');
      $('.hidden').val('');
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
      $('.form__submit').prop('disabled', false);
    })
    return false;
  })
});
