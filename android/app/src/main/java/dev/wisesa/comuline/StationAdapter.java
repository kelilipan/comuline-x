package dev.wisesa.comuline;

import android.app.Activity;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

public class StationAdapter extends RecyclerView.Adapter<StationAdapter.StationViewHolder> {

    private List<Station> stationList; // Original list of stations
    private List<Station> filteredStationList; // List for filtered stations

    public StationAdapter(List<Station> stationList) {
        this.stationList = stationList;
        this.filteredStationList = new ArrayList<>(stationList); // Initialize filtered list with original data
    }

    @NonNull
    @Override
    public StationViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(android.R.layout.simple_list_item_1, parent, false);
        return new StationViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull StationViewHolder holder, int position) {
        Station station = filteredStationList.get(position);
        String stationName = capitalize(station.getName());
        holder.stationNameTextView.setText(stationName); // Display station name

        holder.itemView.setOnClickListener(v -> {
           // todo
        });
    }

    @Override
    public int getItemCount() {
        return filteredStationList.size(); // Return the size of the filtered list
    }

    // Method to filter the station list based on user input
    public void filter(String query) {
        filteredStationList.clear(); // Clear the current filtered list

        if (query.isEmpty()) {
            filteredStationList.addAll(stationList); // If the query is empty, reset the filtered list
        } else {
            String lowerCaseQuery = query.toLowerCase(); // Convert query to lower case
            for (Station station : stationList) {
                if (station.getName().toLowerCase().contains(lowerCaseQuery)) {
                    filteredStationList.add(station); // Add matching stations to the filtered list
                }
            }
        }
        notifyDataSetChanged(); // Notify the adapter about the change
    }

    static class StationViewHolder extends RecyclerView.ViewHolder {
        TextView stationNameTextView;

        public StationViewHolder(@NonNull View itemView) {
            super(itemView);
            stationNameTextView = itemView.findViewById(android.R.id.text1); // Access the TextView
        }
    }
    private String capitalize(String stationName) {
        String[] words = stationName.split(" ");
        StringBuilder capitalizedName = new StringBuilder();

        for (String word : words) {
            if (!word.isEmpty()) {
                capitalizedName.append(Character.toUpperCase(word.charAt(0))); // Capitalize the first letter
                capitalizedName.append(word.substring(1).toLowerCase()); // Append the rest in lower case
                capitalizedName.append(" "); // Add a space after each word
            }
        }

        return capitalizedName.toString().trim(); // Remove the trailing space
    }
}

