<?php 
        // create curl resource 
        $ch = curl_init(); 

        // set url 
        $text = (isset($_GET["text"]) ? $_GET["text"] : "halo");
        curl_setopt($ch, CURLOPT_URL, "http://sandbox.api.simsimi.com/request.p?key=tHaPiOXzLFtBw2MmnQgdrA29jwoA_Cw3iItD-msS&lc=id&ft=0.5&text=" . urlencode($text)); 

        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        // $output contains the output string 
        $output = curl_exec($ch);

        echo $output;

        // close curl resource to free up system resources 
        curl_close($ch);      
?>
