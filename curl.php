<?php 
        // create curl resource 
        $ch = curl_init(); 

        // set url 
        $text = (isset($_GET["text"]) ? $_GET["text"] : "halo");
        curl_setopt($ch, CURLOPT_URL, "http://sandbox.api.simsimi.com/request.p?key=4628c1ee-2e89-42c0-adf1-9701f7f69fef&lc=id&ft=0.5&text=" . urlencode($text)); 

        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        // $output contains the output string 
        $output = curl_exec($ch);

        echo $output;

        // close curl resource to free up system resources 
        curl_close($ch);      
?>