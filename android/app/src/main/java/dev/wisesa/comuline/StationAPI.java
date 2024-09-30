package dev.wisesa.comuline;
import retrofit2.Call;
import retrofit2.http.GET;

public interface StationAPI {
    @GET("station")
    Call<StationResponse> getStations();
}

