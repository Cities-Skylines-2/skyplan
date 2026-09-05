using System.Collections.Generic;
using UnityEngine;

namespace Skyplan.Cross {
	/// <summary>
	/// Distance is XZ-only elsewhere in the codebase (see SnapQuery), but curve control math needs
	/// full 3D positions so sampled points keep the shape's actual terrain height.
	/// </summary>
	public static class CurveMath {
		private static Vector3 Midpoint(Vector3 a, Vector3 b) => (a + b) * 0.5f;

		private static Vector3 EvaluateQuadratic(Vector3 p0, Vector3 c, Vector3 p2, float t) {
			float u = 1f - t;
			return (u * u * p0) + (2f * u * t * c) + (t * t * p2);
		}

		/// <summary>
		/// Quadratic B-spline over control points: the first and last points are true on-curve
		/// endpoints, every interior point is an off-curve attractor the curve bends toward but
		/// never touches. Fewer than 3 points is just a straight line - there's no interior point
		/// to act as a control.
		/// </summary>
		public static List<Vector3> Sample(IReadOnlyList<Vector3> pts, int stepsPerSegment = 16) {
			List<Vector3> result = new();
			if (pts.Count == 0) return result;
			if (pts.Count < 3) {
				result.AddRange(pts);
				return result;
			}
			int n = pts.Count - 1;
			result.Add(pts[0]);
			for (int i = 1; i <= n - 1; i++) {
				Vector3 segStart = i == 1 ? pts[0] : Midpoint(pts[i - 1], pts[i]);
				Vector3 segEnd = i == n - 1 ? pts[n] : Midpoint(pts[i], pts[i + 1]);
				for (int s = 1; s <= stepsPerSegment; s++) {
					float t = (float)s / stepsPerSegment;
					result.Add(EvaluateQuadratic(segStart, pts[i], segEnd, t));
				}
			}
			return result;
		}
	}
}
