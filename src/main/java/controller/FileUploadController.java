package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class FileUploadController {

    @RequestMapping(value = "/upload", method = RequestMethod.GET)
    public String upload(UploadModel model) {
        return "upload-form";
    }

    @RequestMapping(value = "/upload/files", method = { RequestMethod.POST, RequestMethod.GET })
    public String getDataClient(UploadModel model) {
        return "upload-form";
    }
}
