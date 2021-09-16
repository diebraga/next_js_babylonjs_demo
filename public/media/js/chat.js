$(function () {

  var status_chat_open = accessCookieChat("status_chat");
  if (status_chat_open != "") {
    if (status_chat_open === '1') {
      $(".bt-chat-open").fadeOut(100);
      $("#box-chat").fadeIn(100);
    }
    else {
      $("#box-chat").fadeOut(100);
      $(".bt-chat-open").fadeIn(100);
    }
  }
  else {
    createCookieChat("status_chat", '0', 1);
  }
  
  var audio_noti = new Audio(url_site_d+'media/audio/notification.mp3');

  var scrollConversa = true;
  var scrollConversaPrivate = true;
  var scrollConversaQeA = true;
  var token_room = '';

  var notify_action = true;

  // var sioOptions = {
  //   'query': 'token=' + token_user + '&room=' + room_chat,
  //   'path': "/chat"
  // };
  var socket = io.connect('https://kosmosbrasil.com:3003',{
    path: '/chat/socket.io',
    query: {
      token: token_user,
      room: room_chat
    }
  });

  socket.on('connect', () => {

  });
  socket.on("connect_error", err => {
    if (err.data.type === 'UnauthorizedError') {
      console.log('Suas credenciais estão inválidas!');
      window.location.href = url_site_d+"exit";
    }
  });

  socket.on('receivedMensagePrivate', function (info) {
    if (info.token_room === token_room) {
      renderMensagePrivate("#box-tab-chat-private", info, true);
      socket.emit('upMessagePrivate', { token: token_room });
    }
    else {
      if (notify_action) {
        $(".not-notify").remove();
        $(".notify-user").addClass("notify-user-action");
      }

      renderNotify(".content-notify", info);
      $('.list-conversas .not-people').remove();

      if ($(".bt-user-online-talk[token='" + info.token_room + "']").length) {
        if ($(".bt-user-online-talk[token='" + info.token_room + "']").find('.num-mensage div').length) {
          var num_atual = $(".bt-user-online-talk[token='" + info.token_room + "']").find('.num-mensage div span').text();
          if (num_atual !== '+9') {
            var soma = parseInt(num_atual, 10) + 1;
            var text_soma = soma;
            if (soma > 9) { text_soma = '+9' }
            $(".bt-user-online-talk[token='" + info.token_room + "']").find('.num-mensage div span').text(text_soma);
          }
        }
        else {
          $(".bt-user-online-talk[token='" + info.token_room + "']").find('.num-mensage').html('<div><span>1</span></div>');
        }
      }
      else {
        var value = {
          name_user: info.name,
          avatar_user: info.avatar,
          company_user: info.company,
          token_room: info.token_room,
          n_view: 1
        };
        renderUserTalk("#tab-conversas .list-conversas", value);
      }
    }
  });

  socket.on('receivedMensageGeneral', function (info) {
    if (info.token_user === token_user) {
      renderMensageGeneralMe("#box-tab-chat-geral", info, true);
    } else {
      renderMensageGeneral("#box-tab-chat-geral", info, true);
    }
  });

  socket.on('getMensageGeneral', function (info) {
    $("#box-tab-chat-geral").html('');
    for (let value of info.messages.reverse()) {
      if (value.type === 1) {
        renderMensageGeneralMe("#box-tab-chat-geral", value, false);
      }
      else {
        renderMensageGeneral("#box-tab-chat-geral", value, false);
      }
    }
    $("#box-tab-chat-geral").animate({ scrollTop: $("#box-tab-chat-geral")[0].scrollHeight }, 0);
  });

  socket.on('receivedMensageQuest', function (info) {
    renderMensageQeA("#box-tab-chat-quest", info, true);
  });

  socket.on('getMensageQeA', function (info) {
    $("#box-tab-chat-quest").html('');
    for (let value of info.messages.reverse()) {
      renderMensageQeA("#box-tab-chat-quest", value, false);
    }
  });

  socket.on('getTalkChat', function (info) {
    var flag = true;
    var count = 0;
    $("#tab-conversas .list-conversas").html("");
    for (let value of info.users) {

      renderUserTalk("#tab-conversas .list-conversas", value);

      if (value.n_view > 0) {
        if (flag) {
          $(".content-notify").html("");
          if (notify_action) {
            $(".notify-user").addClass("notify-user-action");
          }
          flag = false;
        }
        renderNotifyTotal(".content-notify", value);
      }
      count++;
    }
    if (count === 0) {
      $("#tab-conversas .list-conversas").html('<div class="not-people"><ion-icon name="chatbubbles-outline"></ion-icon><br>Você não tem nenhuma conversa.</div>');
    }
  });

  socket.on('upLikeQuest', function (info) {
    var total_like = $("#like-" + info.token + " .total-like").text();
    if (info.status_like == 0) {
      $("#like-" + info.token + " .total-like").text(parseInt(total_like) - 1);
    }
    else {
      $("#like-" + info.token + " .total-like").text(parseInt(total_like) + 1);
    }
  });


  socket.on('upUserOnline', function (info) {
    if (info.type == 1) {
      $("#tab-pessoas .not-people").remove();

      renderUserOnline('.list-pessoas', info.data_user);

      if (typeof token_room !== 'undefined' && token_room != '') {
        if (info.data_user.token === token_room) {
          $('.avatar-status-user').removeClass('avatar-offline');
          $('.avatar-status-user').addClass('avatar-online');
        }
      }

    }
    else {

      $(".bt-user-online[token='" + info.data_user.token + "']").remove();
      var num_user = $(".list-pessoas > .li-conversa").length;
      if (num_user === 0) {
        $(".list-pessoas").html('<div class="not-people"><ion-icon name="chatbubbles-outline"></ion-icon><br>No momento não há pessoas online.</div>');
      }
      if (typeof token_room !== 'undefined' && token_room != '') {
        if (info.data_user.token === token_room) {
          $('.avatar-status-user').removeClass('avatar-online');
          $('.avatar-status-user').addClass('avatar-offline');
        }
      }
    }
  });

  socket.on('getUserOnline', function (info) {
    $(".list-pessoas").html("");
    var cont_user = 0;
    for (let value of info) {
      renderUserOnline('.list-pessoas', value);
      cont_user++;
    }
    if (cont_user == 0) {
      $(".list-pessoas").html('<div class="not-people"><ion-icon name="chatbubbles-outline"></ion-icon><br>No momento não há pessoas online.</div>');
    }
  });

  socket.on('sendMenssageFixed', function (info) {
    if (info.status_fixed == 0) {
      $(".message_fixed").remove(0);
    }
    else if (info.status_fixed == 1) {
      $("#box-text-fixed").html('<div class="message_fixed shadow"><p class="text_message_fixed">'+info.text_fixed+'</p><i class="icofont-ui-close close_message_fixed"></i></div>');
    }
  });

  socket.on('exitUser', function (info) {
    window.location.href = url_site_d + "exit";
  });


  socket.on('disconnect', function () {

  });

  $(document).on("click", ".close_message_fixed", function (e) {
    e.preventDefault();
    $(".message_fixed").remove(0);
    createCookieChat("status_fixed",$(this).attr('token'), 1);

  });

  //minimiza o chat
  $(document).on("click", ".minus-chat", function (e) {
    e.preventDefault();

    token_room = '';
    createCookieChat("status_chat",'0', 1);
    $("#box-chat").fadeOut(100);
    $(".bt-chat-open").fadeIn(100);
  });

  //maximiza o chat
  $(document).on("click", ".bt-chat-open", function (e) {
    e.preventDefault();

    token_room = '';
    createCookieChat("status_chat",'1', 1);
    $(".bt-chat-open").fadeOut(100);
    $("#box-chat").fadeIn(100);
    $("#box-tab-chat-geral").animate({ scrollTop: $("#box-tab-chat-geral")[0].scrollHeight }, 0);
  });

  // 
  $(document).on("click", ".bt-menu-chat", function (e) {
    e.preventDefault();

    token_room = '';

    $(".tabs-chat").removeClass("tab-active");
    $(".bt-menu-chat").removeClass("active");
    $(this).addClass("active");
    var tab = $(this).attr("data-tab");
    var active_textarea = $(this).attr("data-textarea");
    if (active_textarea === "1") {

      $(".mensage-chat").removeClass("active");
      $.each($(".bt-tab-chat"), function () {
        if ($(this).hasClass("active")) {
          var tab = $(this).attr("data-tab");
          if (tab === "#tab-geral") {
            $("#mensage-chat-general").addClass("active");
          }
          else {
            $("#mensage-chat-quest").addClass("active");
          }
        }
      });

    }
    else {
      $(".mensage-chat").removeClass("active");
    }

    //getTalkChat();
    $(tab).addClass("tab-active");
    $(".box-scroll").animate({ scrollTop: $(".box-scroll")[0].scrollHeight }, 0);
  });

  $(document).on("click", ".bt-tab-chat", function (e) {
    e.preventDefault();

    token_room = '';

    $(".bt-tab-chat").removeClass("active");
    $(this).addClass("active");
    $("#tab-chat .content-tab-chat").removeClass("tab-active");
    var tab = $(this).attr("data-tab");
    $(".mensage-chat").removeClass("active");

    if (tab === "#tab-geral") {
      $("#mensage-chat-general").addClass("active");
      $(tab).addClass("tab-active");
    }
    else {
      $("#mensage-chat-quest").addClass("active");
      $(tab).addClass("tab-active");
      $("#box-tab-chat-quest").animate({ scrollTop: $("#box-tab-chat-quest")[0].scrollHeight }, 0);
    }


  });

  $(document).on("click", ".bt-tab-participante", function (e) {
    e.preventDefault();

    token_room = '';

    $(".bt-tab-participante").removeClass("active");
    $(this).addClass("active");
    $("#tab-participantes .content-tab-chat").removeClass("tab-active");
    var tab = $(this).attr("data-tab");

    $(tab).addClass("tab-active");

  });


  $(document).on("click", "#bt-envia-mensage-general", function (e) {
    e.preventDefault();
    submitMensage("#box-tab-chat-geral");
  });

  $(document).on("click", "#bt-envia-mensage-private", function (e) {
    e.preventDefault();
    submitMensagePrivate("#box-tab-chat-private");
  });

  $(document).on("click", "#bt-envia-mensage-quest", function (e) {
    e.preventDefault();
    submitMensageQuest("#box-tab-chat-quest");
  });

  $(document).on("click", ".bt-user-online", function (e) {
    var tokenUser = $(this).attr("token");

    var data_user_c = {
      name_user: $(this).find('.data-user .li-data-user .name').text(),
      company_user: $(this).find('.data-user .li-data-user .company').text(),
      avatar_user: $(this).children('.avatar').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, ""),
    }
    renderUserChat(data_user_c);
    roomChatPrivate(tokenUser);
  });

  $(document).on("click", ".bt-user-online-talk", function (e) {

    $(this).find('.num-mensage div').remove();

    var tokenRoom = $(this).attr("token");
    var data_user_c = {
      name_user: $(this).find('.data-user .li-data-user .name').text(),
      company_user: $(this).find('.data-user .li-data-user .company').text(),
      avatar_user: $(this).children('.avatar').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, ""),
    }
    renderUserChat(data_user_c);
    roomChatPrivate(tokenRoom);
  });

  $(document).on("click", ".mensage-client-open", function (e) {

    var tokenRoom = $(this).attr("token");
    var data_user_c = {
      name_user: $(this).text(),
      company_user: $(this).parent('.data-user').children('.company').text(),
      avatar_user: $(".mensage-client[token='" + tokenRoom + "']").children('.avatar').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, ""),
    }

    $(".tabs-chat").removeClass("tab-active");
    $(".bt-menu-chat").removeClass("active");
    $(".bt-menu-chat[data-tab='#tab-participantes']").addClass("active");

    renderUserChat(data_user_c);
    roomChatPrivate(tokenRoom);
  });



  //prescionar o enter para enviar a mensagem
  $('#text-mensage-chat-general').on("keypress", function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
      e.preventDefault();
      submitMensage("#box-tab-chat-geral");
    }
  });

  $('#text-mensage-chat-private').on("keypress", function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
      e.preventDefault();
      submitMensagePrivate("#box-tab-chat-private");
    }
  });

  $('#text-mensage-chat-quest').on("keypress", function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
      e.preventDefault();
      submitMensageQuest("#box-tab-chat-quest");
    }
  });

  //click na seta para ver novas mensagens
  $(document).on("click", "#new-message-geral", function (e) {
    scrollConversa = true;
    $(this).fadeOut(0);
    scrollText("#box-tab-chat-geral");
  });

  $(document).on("click", "#new-message-private", function (e) {
    scrollConversaPrivate = true;
    $(this).fadeOut(0);
    scrollTextPrivate("#box-tab-chat-private");
  });

  $(document).on("click", "#new-message-qea", function (e) {
    scrollConversaQeA = true;
    $(this).fadeOut(0);
    scrollTextQeA("#box-tab-chat-quest");
  });

  //rolando as conversas com o scroll
  $('#box-tab-chat-geral').bind('mousewheel', function (e) {
    scrollConversa = false;
    if (($(this)[0].scrollHeight - $(this).height() - 20) <= $(this).scrollTop()) {
      scrollConversa = true;
      $("#new-message-geral").fadeOut(0);
    }

  });

  $('#box-tab-chat-private').bind('mousewheel', function (e) {
    scrollConversaPrivate = false;
    if (($(this)[0].scrollHeight - $(this).height() - 20) <= $(this).scrollTop()) {
      scrollConversaPrivate = true;
      $("#new-message-private").fadeOut(0);
    }

  });

  $('#box-tab-chat-quest').bind('mousewheel', function (e) {
    scrollConversaQeA = false;
    if (($(this)[0].scrollHeight - $(this).height() - 20) <= $(this).scrollTop()) {
      scrollConversaQeA = true;
      $("#new-message-qea").fadeOut(0);
    }

  });

  //arrastar box do chat
  $("#box-chat").draggable({
    containment: ".cont-limit-play",
    handle: "#header-box-chat",
    scroll: false,
  });


  $(document).on('focus.autoExpand', 'textarea.autoExpand', function () {
    var savedValue = this.value;
    this.value = '';
    this.baseScrollHeight = this.scrollHeight;
    this.value = savedValue;
  });



  $(document).on('input.autoExpand', 'textarea.autoExpand', function () {
    var minRows = this.getAttribute('data-min-rows') | 0, rows;
    this.rows = minRows;
    rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
    if (rows > 4) {
      $(this).css("overflow-y", "auto");
      this.rows = 5;
    }
    else {
      $(this).css("overflow-y", "hidden");
      this.rows = minRows + rows;
    }
  });

  $(document).on("click", ".bt-like-mensage", function (e) {
    var token_like = $(this).attr("token");
    socket.emit('getLikeQuest', { token: token_like });
    if ($(this).hasClass("like-active")) {
      $(this).removeClass("like-active");
    }
    else {
      $(this).addClass("like-active");
    }
  });

  $(document).on("click", ".item-notification", function (e) {
    var tokenRoom = $(this).attr("token");

    $(".bt-user-online-talk[token='" + tokenRoom + "']").find('.num-mensage div').remove();

    var data_user_c = {
      name_user: $(this).find('.li-user-notify .data-user .li-data-user .name').text(),
      company_user: $(this).find('.li-user-notify .data-user .li-data-user .company').text(),
      avatar_user: $(this).find('.li-user-notify .avatar').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, ""),
    }

    $(this).remove();
    $(".item-notification[token='" + tokenRoom + "']").remove();
    $(".tabs-chat").removeClass("tab-active");
    $(".bt-menu-chat").removeClass("active");
    $(".bt-menu-chat[data-tab='#tab-participantes']").addClass("active");

    $(".bt-chat-open").fadeOut(100);
    $("#box-chat").fadeIn(100);

    renderUserChat(data_user_c);
    roomChatPrivate(tokenRoom);

  });

  $(".notify-user").parent().on('hidden.bs.dropdown', function (e) {
    checkTotalNotification();
  });

  function submitMensage(destino) {
    //Remove seta de nova mensagem e seta scroll das mensagens
    scrollConversa = true;
    $("#new-message-geral").fadeOut(0);

    var mensage = $("#text-mensage-chat-general").val();
    if (mensage.length) {

      socket.emit('sendMensageGeneral', { message_text: mensage, room: room_chat }, function (response) {
        if (response.status === 200) {
          var makeMensage = {
            message: mensage,
            hours: response.hours,
          };
          renderMensageGeneralMe(destino, makeMensage, true);
        }

      });

      $('#text-mensage-chat-general').attr("rows", "1");
      $('#text-mensage-chat-general').val("");
      $('#text-mensage-chat-general').focus("");

    }
  }

  function submitMensageQuest(destino) {
    //Remove seta de nova mensagem e seta scroll das mensagens
    scrollConversaQeA = true;
    $("#new-message-qea").fadeOut(0);

    var mensage = $("#text-mensage-chat-quest").val();
    if (mensage.length) {

      socket.emit('sendMensageQeA', { message_text: mensage }, function (response) {
        if (response.status === '200') {

          var makeMensage = {
            message: mensage,
            hours: response.hours,
            name: response.data_user.name_user,
            avatar_user: response.data_user.avatar_user,
            company: response.data_user.company_user,
            total_like: 0,
            token: response.token,
            token_user: response.data_user.token_user
          }
          renderMensageQeA(destino, makeMensage, true);
        }

      });

      $('#text-mensage-chat-quest').attr("rows", "1");
      $('#text-mensage-chat-quest').val("");
      $('#text-mensage-chat-quest').focus("");

    }
  }

  function submitMensagePrivate(destino) {
    //Remove seta de nova mensagem e seta scroll das mensagens
    scrollConversaPrivate = true;
    $("#new-message-private").fadeOut(0);

    var mensage = $("#text-mensage-chat-private").val();
    if (mensage.length) {

      socket.emit('sendMensagePrivate', { message_text: mensage, token: token_room }, function (response) {
        if (response.status === '200') {

          var makeMensage = {
            message: mensage,
            hours: response.hours,
          }
          renderMensagePrivateMe(destino, makeMensage, true);


          if (($(".bt-user-online-talk[token='" + token_room + "']").length) === 0) {
            $('.list-conversas .not-people').remove();

            var value = {
              name_user: $('.dados-user-chat-p .data-user .li-data-user .name').text(),
              avatar_user: $('.dados-user-chat-p .avatar').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, ""),
              company_user: $('.dados-user-chat-p .data-user .company').text(),
              token_room: token_room,
              n_view: 0
            };

            renderUserTalk("#tab-conversas .list-conversas", value);

          }
        }

      });

      $('#text-mensage-chat-private').attr("rows", "1");
      $('#text-mensage-chat-private').val("");
      $('#text-mensage-chat-private').focus("");

    }
  }

  function scrollText(destino) {
    if (scrollConversa) {
      $(destino).animate({ scrollTop: $(destino)[0].scrollHeight }, 500);
    }
    else {
      $("#new-message-geral").fadeIn(0);
    }
  }

  function scrollTextPrivate(destino) {
    if (scrollConversaPrivate) {
      $(destino).animate({ scrollTop: $(destino)[0].scrollHeight }, 500);
    }
    else {
      $("#new-message-private").fadeIn(0);
    }
  }

  function scrollTextQeA(destino) {
    if (scrollConversaQeA) {
      $(destino).animate({ scrollTop: $(destino)[0].scrollHeight }, 500);
    }
    else {
      $("#new-message-qea").fadeIn(0);
    }
  }

  function renderMensageGeneral(destino, info, scrol) {
    if (scrol) { scrollText(destino); }
    $(destino).append('<div class="mensage-client" token="' + info.token + '"><div class="avatar" style="background-image: url(' + avatarImg(info.avatar_user) + ');"></div><div class="box-mensage-chat"><div class="data-user"><span class="name mensage-client-open" token="' + info.token + '">' + info.name + '</span><span class="company" >' + info.company + '</span>  </div><div class="mensage-client-user"><p>' + info.message + '</p> <span class="hours">' + info.hours + '</span> </div></div></div>');
  }

  function renderMensageGeneralMe(destino, info, scrol) {
    if (scrol) { scrollText(destino); }
    var name = "EU";
    $(destino).append('<div class="mensage-client user-me"><div class="avatar"></div><div class="box-mensage-chat"><div class="data-user"><span class="name">' + name + '</span> </div><div class="mensage-client-user"><p>' + info.message + '</p> <span class="hours">' + info.hours + '</span> </div></div></div>');
  }


  function renderMensagePrivate(destino, info, scrol) {
    if (scrol) { scrollTextPrivate(destino); }
    $(destino).append('<div class="mensage-client mensage-privat"><div class="box-mensage-chat"><div class="mensage-client-user"><p>' + info.message + '</p><span class="hours">' + info.hours + '</span></div></div></div>');
  }

  function renderMensagePrivateMe(destino, info, scrol) {
    if (scrol) { scrollTextPrivate(destino); }
    var name = "EU";
    $(destino).append('<div class="mensage-client mensage-privat user-me"><div class="box-mensage-chat"><div class="mensage-client-user"><p>' + info.message + '</p><span class="hours">' + info.hours + '</span></div></div></div>');
  }

  function renderMensageQeA(destino, info, scrol) {
    if (scrol) { scrollTextQeA(destino); }
    var like_active = "";
    if (info.status_like == 1) {
      like_active = "like-active";
    }
    if (info.token !== token_user) {
      $(destino).append('<div class="mensage-client" token="' + info.token_user + '"><div class="avatar" style="background-image: url(' + avatarImg(info.avatar_user) + ');"></div><div class="box-mensage-chat"><div class="data-user"><span class="name mensage-client-open" token="' + info.token_user + '">' + info.name + '</span><span class="company">' + info.company + '</span> </div><div class="mensage-client-user"><p>' + info.message + '</p> <span class="hours">' + info.hours + '</span> </div> <div class="bt-like-mensage ' + like_active + '" id="like-' + info.token + '" token="' + info.token + '"><i class="icofont-like"></i><div class="total-like">' + info.total_like + '</div></div> </div></div>');
    }
    else {
      $(destino).append('<div class="mensage-client"><div class="avatar" style="background-image: url(' + avatarImg(info.avatar_user) + ');"></div><div class="box-mensage-chat"><div class="data-user"><span class="name">' + info.name + '</span><span class="company">' + info.company + '</span> </div><div class="mensage-client-user"><p>' + info.message + '</p> <span class="hours">' + info.hours + '</span> </div> <div class="bt-like-mensage ' + like_active + '" id="like-' + info.token + '" token="' + info.token + '"><i class="icofont-like"></i><div class="total-like">' + info.total_like + '</div></div> </div></div>');
    }
  }
  function renderUserOnline(destino, info) {
    $(destino).append('<div class="li-conversa bt-user-online" token="' + info.token + '"><div class="avatar" style="background-image: url(' + avatarImg(info.avatar_user) + ');"></div><div class="data-user"><div class="li-data-user"><span class="name">' + info.name + '</span><span class="company">' + info.company + '</span>  </div></div><div class="num-mensage"> </div></div>');//<div><span>+3</span></div>
  }


  function renderUserTalk(destino, info) {
    if (info.n_view > 9) {
      var text_n_view = "<div><span>+9</span></div>";
    }
    else if (info.n_view == 0) {
      var text_n_view = "";
    }
    else {
      var text_n_view = "<div><span>" + info.n_view + "</span></div>";
    }
    $(destino).append('<div class="li-conversa bt-user-online-talk" token="' + info.token_room + '"><div class="avatar" style="background-image: url(' + avatarImg(info.avatar_user) + ');"></div><div class="data-user"><div class="li-data-user"><span class="name">' + info.name_user + '</span> <span class="company">' + info.company_user + '</span>  </div></div><div class="num-mensage">' + text_n_view + '</div></div>');
  }

  function renderNotify(destino, info) {
    $('.notify-user').effect("shake", { times: 4, distance: 10 });
    audio_noti.play();
    $(destino).prepend('<div class="dropdown-item item-notification" token="' + info.token_room + '"><div class="li-user-notify"><div class="avatar" style="background-image: url(' + avatarImg(info.avatar_user) + ');"></div><div class="data-user"><div class="li-data-user"><span class="name">' + info.name + '</span> <span class="company">' + info.company + '</span>  </div><div class="text-notify">Nova mensagem: ' + doTruncarStr(info.message, 20) + ' ás <span class="data-notify">' + info.hours + '</span></div>  </div></div></div>');
  }

  function renderNotifyTotal(destino, info) {
    $('.notify-user').effect("shake", { times: 4, distance: 10 });
    var text_new_m;
    if (info.n_view == 1) {
      text_new_m = info.n_view + " nova mensagem."
    }
    else {
      text_new_m = info.n_view + " novas mensagens."
    }
    $(destino).prepend('<div class="dropdown-item item-notification" token="' + info.token_room + '"><div class="li-user-notify"><div class="avatar" style="background-image: url(' + avatarImg(info.avatar_user) + ');"></div><div class="data-user"><div class="li-data-user"><span class="name name-2">' + info.name_user + '</span> <span class="company">' + info.company_user + '</span></div><div class="text-notify">' + text_new_m + '</div></div></div></div>');
  }
  function avatarImg(info) {
    if (info == null) {
      return url_site_d + "media/img/avatar-u.png";
    }
    else {
      var resultado = info.replace(url_site_d, "");
      return url_site_d + resultado;
    }
  }


  function getMensagePrivate(token) {
    $("#box-tab-chat-private").html('');
    $("#box-tab-chat-private").html('<div class="loading-chat-geral"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>');
    socket.emit('getMensagePrivate', { token: token }, function (response) {
      if (response.status === '200') {
        $("#box-tab-chat-private").html('');
        for (let value of response.data_mess.messages.reverse()) {
          if (value.type === 1) {
            renderMensagePrivateMe("#box-tab-chat-private", value, false);
          }
          else {
            renderMensagePrivate("#box-tab-chat-private", value, false);
          }
        }
        $("#box-tab-chat-private").animate({ scrollTop: $("#box-tab-chat-private")[0].scrollHeight }, 0);
      }

    });
  }

  function renderUserChat(info) {
    $(".dados-user-chat-p .avatar").css("background-image", "url(" + avatarImg(info.avatar_user) + ")");
    $(".dados-user-chat-p .name").html(info.name_user);
    $(".dados-user-chat-p .company").html(info.company_user);
    $("#text-mensage-chat-private").attr("placeholder", "Write message to " + info.name_user);
  }

  function roomChatPrivate(tokenUser) {
    getMensagePrivate(tokenUser);
    //renderUserChat(data.user_2);

    token_room = tokenUser;
    removeNotificationRoom(token_room);

    if ($('.bt-user-online[token="' + token_room + '"]').length) {
      $('.avatar-status-user').removeClass('avatar-offline');
      $('.avatar-status-user').addClass('avatar-online');
    }
    else {
      $('.avatar-status-user').removeClass('avatar-online');
      $('.avatar-status-user').addClass('avatar-offline');
    }

    $(".mensage-chat").removeClass("active");
    $("#mensage-chat-private").addClass("active");
    $(".tabs-chat").removeClass("tab-active");
    $("#tab-chat-privado").addClass("tab-active");

    //setViewChat(data.token);
  }
  function removeNotificationRoom(token) {
    $(".item-notification[token='" + token + "']").remove();
    checkTotalNotification();
  }

  function checkTotalNotification() {
    let length = $('.content-notify').children().length;
    if (length < 1) {
      $(".notify-user").removeClass("notify-user-action");
      notify_action = true;
      $(".content-notify").html('<div class="dropdown-item not-notify"><ion-icon name="alarm"></ion-icon><br><p>Nenhuma notificação no momento</p></div>');
    }
  }

  function doTruncarStr(str, size) {
    if (str == undefined || str == 'undefined' || str == '' || size == undefined || size == 'undefined' || size == '') {
      return str;
    }

    var shortText = str;
    if (str.length >= size + 3) {
      shortText = str.substring(0, size).concat('...');
    }
    return shortText;
  }

  function createCookieChat(cookieName, cookieValue, daysToExpire) {
    var date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString()+ ";path=/";
  }
  function accessCookieChat(cookieName) {
    var name = cookieName + "=";
    var allCookieArray = document.cookie.split(';');
    for (var i = 0; i < allCookieArray.length; i++) {
      var temp = allCookieArray[i].trim();
      if (temp.indexOf(name) == 0)
        return temp.substring(name.length, temp.length);
    }
    return "";
  }
  window.chat_patrocinio=function(token, data_user_c){

    $(".tabs-chat").removeClass("tab-active");
    $(".bt-menu-chat").removeClass("active");
    $(".bt-menu-chat[data-tab='#tab-participantes']").addClass("active");

    renderUserChat(data_user_c);
    roomChatPrivate(token);

    $(".bt-chat-open").fadeOut(100);
    $("#box-chat").fadeIn(100);
    createCookie("status_chat",'1', 1);
  }

});