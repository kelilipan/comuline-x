package dev.wisesa.comuline;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

/**
 * Implementation of App Widget functionality.
 * App Widget Configuration implemented in {@link StationWidgetConfigureActivity StationWidgetConfigureActivity}
 */
public class StationWidget extends AppWidgetProvider {
    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
                                int appWidgetId) {
        SharedPreferences sharedPreferences = context.getSharedPreferences("dev.wisesa.comuline.StationWidget", Context.MODE_PRIVATE);
        String stationName = sharedPreferences.getString("station_name_" + appWidgetId, "No Station Selected");
        String stationId = sharedPreferences.getString("station_id_" + appWidgetId, "");

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.station_widget);
        views.setTextViewText(R.id.stationName, "Station: " + stationName);
        views.setTextViewText(R.id.stationId, "ID: " + stationId);

        // Instruct the widget manager to update the widget
        appWidgetManager.updateAppWidget(appWidgetId,views);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onDeleted(Context context, int[] appWidgetIds) {
        // When the user deletes the widget, delete the preference associated with it.
        for (int appWidgetId : appWidgetIds) {
//            StationWidgetConfigureActivity.deleteTitlePref(context, appWidgetId);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}