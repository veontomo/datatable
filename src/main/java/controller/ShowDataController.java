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

import dao.FakeDb;
import model.DatatableControl;
import model.Person;
import model.TableData;

@Controller
public class ShowDataController {
    private final FakeDb db = new FakeDb();

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
    public TableData getPersons(@RequestBody DatatableControl filter) {
        final int size = db.getSize();

        List<Person> items = new ArrayList<>();
        final String[][] rows = db.getRows(filter);
        System.out.println("rows contains " + rows.length + " lines");
        for (final String[] row : rows) {
            items.add(new Person(Integer.parseInt(row[0]), row[1], row[2], row[3]));
        }

        final TableData model = new TableData();
        model.setRecordsTotal(size);
        model.setRecordsFiltered(size);
        model.setDraw(filter.getDraw());
        model.setData(items);
        return model;

    }

    @RequestMapping(value = "/data/positions", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String[] getPositions() {
        return db.getUniqueColumnValues(3);
    }

}
