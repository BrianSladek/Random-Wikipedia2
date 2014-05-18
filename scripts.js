$(document).ready(function(){

  $(function() {
   
      $( "#autocomplete" ).autocomplete({
        source: function( request, response ) {
          
          var req = {
            format: 'json',
            action: 'query',
            list:   'allcategories',
            acprefix:request.term,
            //hidden tags categories that are hidden with __HIDDENCAT__
            acprop:"hidden|size",
            aclimit: '100'
      	  };
      
      	$.ajax({
          url: 'http://en.wikipedia.org/w/api.php',
          data: req,
          cache: true,
          dataType: 'jsonp',
          success: function( data ) {
              response( $.map( data.query.allcategories, function( item ) {
              	if (parseInt(item["pages"]) > 10) {
  		              return {
  		                label: item["*"],
  		                value:  item["*"]
  		              }
  		          }
              }));
            }
          });
        },
        minLength: 2,
        delay:300,
        select: function( event, ui ) {
          $("#selected-categories").append('<li>' + ui.item.label + '</li>');
          var url = "";
              var req = {
              format: 'json',
              action: 'query',
              list: 'categorymembers',
              cmtitle:'Category:' + ui.item.label,
              cmprop:'ids|title|type',
              cmlimit:'100'
              };
          
             $.ajax({
              url: 'http://en.wikipedia.org/w/api.php',
              data: req,
              cache: true,
              dataType: 'jsonp',
              beforeSend: function (jqXHR, settings) {
               url = settings.url + "?" + settings.data;
              },
              success: function(data)
              {
                  loadIframe("wikipage", "http://en.wikipedia.org/?curid=" + data["query"]["categorymembers"][0]["pageid"]);
              }
          });

        },
        open: function() {
         // $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
         
        },
        close: function() {
          //$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        }
      });
    });

  function loadIframe(iframeName, url) {
    var $iframe = $('#' + iframeName);
    if ( $iframe.length ) {
        $iframe.attr('src',url);   
        return false;
    }
    return true;
  }

$( "#generate-new-random" ).click(function() {
});


});

