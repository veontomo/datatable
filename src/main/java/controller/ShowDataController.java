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

    @RequestMapping(value = "/data/persons", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getPersons(@RequestBody DatatableControl obj) {
        final int size = obj.getLength();
        List<Person> items = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            final String name = obj.getName();
            if (name == null || name.isEmpty()) {
                items.add(dao.getRow());
            } else {
                items.add(dao.getRow(name));
            }
        }

        final TableData model = new TableData();
        model.setRecordsTotal(totalSize);
        model.setRecordsFiltered(totalSize);
        model.setDraw(obj.getDraw());
        model.setData(items);
        Gson gson = new Gson();
        final String result = gson.toJson(model);
        System.out.println("result: " + result);
        return result;

    }

}
