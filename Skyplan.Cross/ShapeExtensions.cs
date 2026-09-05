using System.Collections.Generic;
using Skyplan.Models;
using UnityEngine;

namespace Skyplan.Cross {
	public static class ShapeExtensions {
		public static IReadOnlyList<Vector3> GetSnapVertices(this Shape s) => s.pts;

		public static IEnumerable<(Vector3 a, Vector3 b)> GetSnapSegments(this Shape s) {
			if (s.Type == Tools.curve) {
				List<Vector3> sampled = CurveMath.Sample(s.pts);
				for (int i = 0; i < sampled.Count - 1; i++)
					yield return (sampled[i], sampled[i + 1]);
				yield break;
			}
			for (int i = 0; i < s.pts.Count - 1; i++)
				yield return (s.pts[i], s.pts[i + 1]);
			if (s.Type == Tools.polygon && s.pts.Count > 2)
				yield return (s.pts[s.pts.Count - 1], s.pts[0]);
		}
	}
}
