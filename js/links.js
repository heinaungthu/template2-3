
function cb_send_app_link() {
      if (isset( $_POST['hid-send-app-link'] ) && wp_verify_nonce( $_POST['hid-send-app-link'], 'swp-send-app-link' ) ) {
       //print_r($_POST); die('kartik');
       if( !empty( $_POST['email_or_mobile'] ) ) {
        $appType = $this->mobile_user_agent_switch();
        $appType = ($appType) ? $appType : 'desktop';
        $aResponse = wp_remote_post( "https://api.hotelquickly.com/api/1/app-links?applicationCode=INVITE01", array(
          'body' => json_encode(array(
             'recipient' => trim($_POST['email_or_mobile']),
             'campaignUrlId' => '123',
             'appType' => $appType,
            )),
            )
        );

              }
      }
     }

/*
     * Mobile device detection
     */
     function mobile_user_agent_switch(){
      $device = '';

      if( stristr($_SERVER['HTTP_USER_AGENT'],'iphone') || strstr($_SERVER['HTTP_USER_AGENT'],'iphone') || stristr($_SERVER['HTTP_USER_AGENT'],'ipad') ) {
       $device = "iphone";
      } else if( stristr($_SERVER['HTTP_USER_AGENT'],'blackberry') ) {
       $device = "blackberry";
      } else if( stristr($_SERVER['HTTP_USER_AGENT'],'android') ) {
       $device = "android";
      }

      if( $device ) {
       return $device;
      }
      return false;
     }
