$(document).ready(function(){

  // Use live key on live site only
  if (window.location.protocol == 'https:' && window.location.hostname == 'dxephilly.org') {
    Stripe.setPublishableKey('pk_live_M37JUfbU7i9XlQWeGwFNKhdR');
  } else {
    Stripe.setPublishableKey('pk_test_mhiY777RppMZKb6zYsnaZKXE');
  }

  $('.bxslider').bxSlider({
    auto: true,
    autoControls: true
  });

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function hours_to_am_pm(time) {
    hours = time.getHours();
    if (hours < 12) {
      if (hours == 0) {
        return '12 AM';
      } else {
        return hours+' AM';
      }
    } else {
      return (hours%12)+' PM';
    }
  }

  function start_end_time_string(start_time, end_time) {
    if (start_time && end_time) {
      if (start_time.getDate() == end_time.getDate()) {
        return days[start_time.getDay()]+' '+hours_to_am_pm(start_time)+' &ndash; '+hours_to_am_pm(end_time);
      } else {
        return days[start_time.getDay()]+' '+hours_to_am_pm(start_time)+' &ndash; '+days[end_time.getDay()]+' '+hours_to_am_pm(end_time);
      }
    } else if (start_time) {
      return hours_to_am_pm(start_time);
    } else if (end_time) {
      return hours_to_am_pm(end_time);
    }
  }

  $.get('https://api.dxephilly.org/facebook/events/upcoming/next', function(data) {
    if (data) {
      var event_el = $('#next-event');
      var event_link_el = $(event_el).find('.title a');
      $(event_link_el).text(data.name);
      $(event_link_el).attr('href', 'https://www.facebook.com/events/'+data.id);
      var event_time_el = $(event_el).find('.time');
      if (data.start_time) {
        var start_time = new Date(data.start_time);
      } else {
        var start_time = undefined;
      }
      if (data.end_time) {
        var end_time = new Date(data.end_time);
      } else {
        var end_time = undefined;
      }
      $(event_el).find('.month').text(months[start_time.getMonth()]);
      $(event_el).find('.day').text(start_time.getDate());
      if (start_time || end_time) {
        $(event_time_el).html(start_end_time_string(start_time, end_time));
      }
      $(event_el).find('.location a span').text(data.place.name);
      $(event_el).find('.location a').attr('href', 'https://www.google.com/maps/place/'+encodeURIComponent(data.place.name));
      $(event_el).show();
    } else {
      $('#get-notified-button').show();
    }
  });

  function stripeResponseHandler(status, response) {
    if (response.error) {
      $('.donations .notice.failure').show();
      $('.donations .notice.failure').get(0).scrollIntoView();
      $('#donate').find('input').prop('disabled', false);
    } else {
      var donateData = {
        'token': response.id,
        'email': $('#donate-email').val(),
        'amount': $('#donate-amount').val(),
        'frequency': $('#donate-frequency').val()
      };
      $.post('https://api.dxephilly.org/donate', donateData, function(data, status) {
        var form = $('#donate');
        if (status != "success") {
          $('.donations .notice.failure').show();
          $('.donations .notice.failure').get(0).scrollIntoView();
        } else {
          $('.donations .notice.success').show();
          $('.donations .notice.success').get(0).scrollIntoView();
          form.get(0).reset();
        }
        $(form).find('input').prop('disabled', false);
      });
    }
  }

  $('#donate').submit(function(event) {
    event.preventDefault();
    $(this).find('input').prop('disabled', true);
    $('.donations .notice.failure').hide();
    $('.donations .notice.success').hide();
    Stripe.card.createToken($(this), stripeResponseHandler);
    return false;
  });

});
