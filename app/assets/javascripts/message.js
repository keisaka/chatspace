$(function(){

  function buildHTML(message){
    console.log(message)
    var html_common = `<div class= "message">
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
})
