package service;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

import dao.TableDataDao;
import model.Person;
import model.TableData;

@Path("/data")
public class Service {
    private TableDataDao dao = new TableDataDao();

    private final int totalSize = 188;

    @GET
    @Path("/strings")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAll() {
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
        return result;

    }

   

}
