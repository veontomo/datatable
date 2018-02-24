package service;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/data")
public class Service {

	@GET
	@Path("/strings")
	@Produces(MediaType.APPLICATION_JSON)
	public String[] getAll() {
		final int size = 1000;
		final String[] data = new String[size];
		final Long start = System.nanoTime();

		for (int i = 1; i < size; i++) {
			data[i] = String.valueOf(i);
		}
		data[0] = String.valueOf(System.nanoTime() - start);
		return data;

	}

}
