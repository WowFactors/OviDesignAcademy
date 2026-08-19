/**
 * Google Apps Script proxy for the website's live testimonials.
 *
 * Script properties required:
 *   GOOGLE_PLACES_API_KEY = a key with Places API (New) enabled
 *   GOOGLE_PLACE_ID       = the Google Business Profile place ID
 *
 * Deploy as a Web app, execute as yourself, and allow access to anyone.
 * Paste the /exec deployment URL into index.html's
 * data-google-reviews-endpoint attribute.
 */
function doGet(event) {
  var callback = event && event.parameter ? event.parameter.callback : "";

  try {
    var cache = CacheService.getScriptCache();
    var cached = cache.get("ovi-google-reviews-v1");
    var payload = cached ? JSON.parse(cached) : fetchGoogleReviews_();

    if (!cached) {
      cache.put("ovi-google-reviews-v1", JSON.stringify(payload), 1800);
    }
    return outputGoogleReviews_(payload, callback);
  } catch (error) {
    return outputGoogleReviews_({
      ok: false,
      error: error && error.message ? error.message : "Unable to load Google reviews."
    }, callback);
  }
}

function fetchGoogleReviews_() {
  var properties = PropertiesService.getScriptProperties();
  var apiKey = properties.getProperty("GOOGLE_PLACES_API_KEY");
  var placeId = properties.getProperty("GOOGLE_PLACE_ID");

  if (!apiKey || !placeId) {
    throw new Error("GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID must be set in Script properties.");
  }

  var fields = [
    "displayName",
    "rating",
    "userRatingCount",
    "googleMapsUri",
    "reviews.authorAttribution",
    "reviews.rating",
    "reviews.relativePublishTimeDescription",
    "reviews.text",
    "reviews.publishTime"
  ].join(",");
  var response = UrlFetchApp.fetch(
    "https://places.googleapis.com/v1/places/" + encodeURIComponent(placeId),
    {
      method: "get",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": fields,
        "Accept-Language": "en"
      },
      muteHttpExceptions: true
    }
  );
  var status = response.getResponseCode();
  var body = JSON.parse(response.getContentText() || "{}");

  if (status < 200 || status >= 300) {
    throw new Error(body.error && body.error.message ? body.error.message : "Google Places returned HTTP " + status + ".");
  }

  return {
    ok: true,
    placeName: body.displayName ? body.displayName.text : "Ovi Design Academy",
    rating: body.rating || 0,
    totalReviews: body.userRatingCount || 0,
    reviewUrl: body.googleMapsUri || "https://www.google.com/maps",
    reviews: (body.reviews || []).map(function (review) {
      var author = review.authorAttribution || {};
      return {
        author: author.displayName || "Google reviewer",
        authorUrl: author.uri || "",
        profilePhotoUrl: author.photoUri || "",
        rating: review.rating || 5,
        relativeTime: review.relativePublishTimeDescription || "",
        publishedAt: review.publishTime || "",
        text: review.text ? review.text.text : ""
      };
    }).filter(function (review) {
      return Boolean(review.text);
    })
  };
}

function outputGoogleReviews_(payload, callback) {
  var json = JSON.stringify(payload);
  if (callback && /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
    return ContentService.createTextOutput(callback + "(" + json + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}
