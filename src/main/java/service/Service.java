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
		final int size = 23; 
		String[][] items = new String[size][];
		for (int i = 0; i < size; i++) {
			items[i] = dao.getRow();
		}

		final TableData model = new TableData();
		model.setDraw(1);
		model.setRecordsTotal(size);
		model.setRecordsFiltered(size);
		model.setData(items);
		Gson gson = new Gson();
		return gson.toJson(model);

	}

}
