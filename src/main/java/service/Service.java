package service;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

import dao.TableDataDao;
import model.TableData;

@Path("/data")
public class Service {
	private TableDataDao dao = new TableDataDao();
	

	@GET
	@Path("/strings")
	@Produces(MediaType.APPLICATION_JSON)
	public String getAll() {
		final int size = 100; 
		String[][] items = new String[size][];
		for (int i = 0; i < size; i++) {
			items[i] = dao.getRow();
		}

		final TableData model = new TableData();
		model.setDraw(1);
		model.setRecordsTotal(2);
		model.setRecordsFiltered(2);
		model.setData(items);
		Gson gson = new Gson();
		return gson.toJson(model);

	}

}
