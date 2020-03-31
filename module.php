<?php
class CheckoutModule extends Module{
    private $deps = array();
    private $processor = "authorize.net";

    public function __construct(){
        parent::__construct();
        $this->routes = $this->checkoutModRoutes();
        $this->dependencies = $this->deps;
        $this->name = "checkout";
        $this->files = array();
    }

    private function checkoutModRoutes(){
        $checkoutModRoutes = array(
            "checkout" => array(
                "callback" => "renderCheckoutPage",
                "content-type" => "application/json", 
                "files" => array()
            )
        );
        return $checkoutModRoutes;
    }

    //Route callbacks
    public function renderCheckoutPage(){

        //Template Prep
        echo "<h3>----------Begin CC Form Example----------</h3> \n";
        Template::addPath(__DIR__ . "/templates");
        $template = Template::loadTemplate("webconsole");
        $checkoutForm = Template::renderTemplate("checkout-example",array("checkout" => array()));
        $ccForm = Template::renderTemplate("cc-form",array("cc" => array()));
        $template->addStyle($this->getCss());
        $template->addScripts($this->getJs());
        
        return $template->render(array(
			"defaultStageClass" => "not-home", 
			"content" => $checkoutForm . $ccForm,
			"doInit" => false
		));
    }


    //Additional Methods

    private function getCss(){
        $css = array(
                "active" => true,
                "href" => "/modules/checkout/css/ux.css"
            );
        return $css;
    }

    private function getJs(){
        $js = array(
            array(
                "src" => "/modules/checkout/js/app.js"
            ),
            array(
                "src" => "/modules/checkout/js/checkout.js"
            ),
            array(
                "src" => "/modules/checkout/js/data.js"
            ),
            array(
                "src" => "/modules/checkout/js/modal.js"
            ),
            array(
                "src" => "/modules/checkout/js/render.js"
            ),
            array(
                "src" => "/modules/checkout/js/validate.js"
            ),
        );
        return $js;
    }
}
        


//add css and js using template
//follow the car module
//whats the relationship between the Authorize.net and checkout 
