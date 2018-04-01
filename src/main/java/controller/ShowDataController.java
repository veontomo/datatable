package controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import dao.TableDataDao;
import model.DatatableControl;
import model.Person;
import model.TableData;

@Controller
public class ShowDataController {

    private TableDataDao dao = new TableDataDao();

    private final int totalSize = 22;

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

    // curl.exe -X POST -d "{\"name\":\"Mario\"}" -H "Content-Type:
    // application/json" http://localhost:8080/datatable/consumer/data/strings-2
    
    
    // curl.exe -X POST -d "{\"columns\":[[0]]}" -H "Content-Type: application/json" http://localhost:8080/datatable/consumer/data/persons?columns[0][1]=2
    @RequestMapping(value = "/data/persons", method = { RequestMethod.POST,
            RequestMethod.GET },  produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public TableData getPersons(@RequestBody DatatableControl obj) {
        final int size = 15;
        List<Person> items = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            items.add(dao.getRow());
        }

        final TableData model = new TableData();
        model.setRecordsTotal(totalSize);
        model.setRecordsFiltered(totalSize);
        model.setDraw(2);
        model.setData(items);
        Gson gson = new Gson();
        final String result = gson.toJson(model);
        System.out.println("result: " + result);
        return model;

    }

}
