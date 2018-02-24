package controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ShowDataController {
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String root(ModelMap model) {
		return "welcome";
	}
	
	@RequestMapping(value = "/clientside", method = RequestMethod.GET)
	public String getDataClient(ModelMap model) {
		return "client-side";
	}
	
	@RequestMapping(value = "/serverside", method = RequestMethod.GET)
	public String getDataServer(ModelMap model) {
		return "server-side";
	}

}
