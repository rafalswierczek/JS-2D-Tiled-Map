using System;
using System.IO;

namespace ConsoleApp4
{
	class Program
	{
		static void Main(string[] args)
		{
			string path_to_file = @"\";
			int i = 0;
			int x_max = 100;
			int y_max = 100;
			string[] s = new string[] { "water", "ground" };

			//File.
			File.WriteAllText(path_to_file+"tiles.js", @"let texture = [];
for(let i=0; i<3; i++)
{
	texture[i] = new Image(100, 100);
	texture[i].src = i+"".jpg"";
}

");
			for(int x = 1; x <= x_max; x++)
			{
				for(int y = 1; y <= y_max; y++)
				{
					if(x == 1 && y == 1) { File.AppendAllText(path_to_file + "tiles.js", "var c" + x + "x" + y + " = { bg: texture[" + i + "], collision: false }," + Environment.NewLine); }
					else if(x == x_max && y == y_max) { File.AppendAllText(path_to_file + "tiles.js", "c" + x + "x" + y + " = { bg: texture[" + i + "], collision: false };" + Environment.NewLine); }
					else
					{
						File.AppendAllText(path_to_file + "tiles.js", "c" + x + "x" + y + " = { bg: texture[" + i + "], collision: false }," + Environment.NewLine);
					}

					if(y == y_max && x % 2 != 0)
					{
						i = 1;
					}
					else if(y == y_max && x % 2 == 0)
					{
						i = 0;
					}
					else
					{
						int res = (i == 0) ? i = 1 : i = 0;
					}
				}
			}
		}
	}
}
