package dev.wisesa.comuline;

import android.app.Activity;
import android.appwidget.AppWidgetManager;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.widget.EditText;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.LinearLayoutManager;

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

        // Get the appWidgetId from the Intent that started this Activity
        Intent intent = getIntent();
        Bundle extras = intent.getExtras();
        if (extras != null) {
            appWidgetId = extras.getInt(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);
        }

        // If this Activity was started with an invalid widget ID, finish it
        if (appWidgetId == AppWidgetManager.INVALID_APPWIDGET_ID) {
            finish();
            return;
        }

        // Initialize Retrofit
        retrofit = new Retrofit.Builder()
                .baseUrl("https://jadwal-krl.wisesa.dev/api/v1/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        stationApi = retrofit.create(StationAPI.class);

         setResult(RESULT_CANCELED);

        stationAdapter = new StationAdapter(this,appWidgetId,stationList);
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
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });
    }

    private void fetchStationData() {
        Call<StationResponse> call = stationApi.getStations();

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