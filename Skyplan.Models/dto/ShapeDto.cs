using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Skyplan.Models.dto {
	public class ShapeDto {
		[JsonProperty("id")]
		public string? Id;
		[JsonProperty("tag")]
		[JsonConverter(typeof(StringEnumConverter))]
		public Tag Tag;
		[JsonProperty("layerId")]
		public string? LayerId;
		[JsonProperty("pts")]
		public List<ScreenPt> Pts = [];
		[JsonProperty("handles")]
		public List<ScreenPt> Handles = [];
		[JsonProperty("inFrame")]
		public bool InFrame;
		[JsonProperty("label")]
		public string? Label;
		[JsonProperty("description")]
		public string? Description;
	}

	public class ScreenPt {
		[JsonProperty("x")]
		public float x;
		[JsonProperty("y")]
		public float y;
	}

	public enum Tag {
	  none,
	  path,
	  polygon,
	  curve,
	  circle,
	  text,
	}
}
