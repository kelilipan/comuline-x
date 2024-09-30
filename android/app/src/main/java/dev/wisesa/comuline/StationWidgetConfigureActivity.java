package dev.wisesa.comuline;

import android.app.Activity;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RemoteViews;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import dev.wisesa.comuline.databinding.StationWidgetConfigureBinding;

import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * The configuration screen for the {@link StationWidget StationWidget} AppWidget.
 */
public class StationWidgetConfigureActivity extends Activity {
    private static final String PREFS_NAME = "dev.wisesa.comuline.StationWidget";
    private static final String PREF_PREFIX_KEY = "appwidget_";
    private static final String KEY_STATION_ID = "station_id_";
    private static final String KEY_STATION_NAME = "station_name_";

    private Retrofit retrofit;
    private StationAPI stationApi;
    private List<Station> stationList = new ArrayList<>();

    private StationAdapter stationAdapter;

    int appWidgetId = AppWidgetManager.INVALID_APPWIDGET_ID;
    private EditText searchStationFilterText;
    private StationWidgetConfigureBinding binding;



    public StationWidgetConfigureActivity() {
        super();
    }


    @Override
    public void onCreate(Bundle icicle) {
        super.onCreate(icicle);

        binding = StationWidgetConfigureBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // Initialize Retrofit
        retrofit = new Retrofit.Builder()
                .baseUrl("https://jadwal-krl.wisesa.dev/api/v1/")  // Base URL
                .addConverterFactory(GsonConverterFactory.create())  // JSON converter
                .build();
        // Create an instance of the API interface
        stationApi = retrofit.create(StationAPI.class);

        // Set the result to CANCELED.  This will cause the widget host to cancel
        // out of the widget placement if the user presses the back button.
         setResult(RESULT_CANCELED);

        stationAdapter = new StationAdapter(stationList);
        binding.recyclerView.setLayoutManager(new LinearLayoutManager(this));
        binding.recyclerView.setAdapter(stationAdapter);

        fetchStationData();

        searchStationFilterText = binding.searchStationFilter;
        searchStationFilterText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                stationAdapter.filter(s.toString());
                Log.d("filter", s.toString());
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });
    }

    private void fetchStationData() {
        // Fetch the station data using Retrofit
        Call<StationResponse> call = stationApi.getStations();

        // Handle the API call asynchronously
        call.enqueue(new retrofit2.Callback<StationResponse>() {
            @Override
            public void onResponse(Call<StationResponse> call, Response<StationResponse> response) {
                String TAG = "StationAPI";
                if (response.isSuccessful()) {
                    if (response.body() != null) {
                        List<Station> stations = response.body().getData();
                        stationList.clear();
                        stationList.addAll(stations);
                        stationAdapter.notifyDataSetChanged();
                        stationAdapter.filter(""); //trigger first init
                        Log.d(TAG, "Stations updated in RecyclerView.");
                    }
                } else {
                    Log.e(TAG, "API call failed. Status code: " + response.code());
                    Log.e(TAG, "Error message: " + response.message());
                }
            }

            @Override
            public void onFailure(@NonNull Call<StationResponse> call, @NonNull Throwable t) {
                // Handle failure
                Log.e("API", "Failed to fetch stations", t);
            }
        });
    }

}