import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface DistrictInfo {
  district: string;
  province: string;
  population: number;
  nightlight: number;
  forest: number;
  cropland: number;
  grassland: number;
  urban: number;
  water: number;
  barren: number;
  urbanExtent: number;
  pm25: number;
  meanElevation: number;
  minElevation: number;
  maxElevation: number;
}

interface DistrictInfoCardProps {
  districtInfo: DistrictInfo | null;
  onClose: () => void;
}

export function DistrictInfoCard({ districtInfo, onClose }: DistrictInfoCardProps) {
  if (!districtInfo) return null;

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl font-bold">{districtInfo.district}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">General Info</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Province:</span>
              <p className="font-medium">{districtInfo.province}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Population & Development</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Population:</span>
              <p className="font-medium">{districtInfo.population.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Nightlight:</span>
              <p className="font-medium">{districtInfo.nightlight.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Land Cover (%)</h3>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Forest:</span>
              <p className="font-medium">{districtInfo.forest.toFixed(1)}%</p>
            </div>
            <div>
              <span className="text-muted-foreground">Cropland:</span>
              <p className="font-medium">{districtInfo.cropland.toFixed(1)}%</p>
            </div>
            <div>
              <span className="text-muted-foreground">Grassland:</span>
              <p className="font-medium">{districtInfo.grassland.toFixed(1)}%</p>
            </div>
            <div>
              <span className="text-muted-foreground">Urban:</span>
              <p className="font-medium">{districtInfo.urban.toFixed(1)}%</p>
            </div>
            <div>
              <span className="text-muted-foreground">Water:</span>
              <p className="font-medium">{districtInfo.water.toFixed(1)}%</p>
            </div>
            <div>
              <span className="text-muted-foreground">Barren:</span>
              <p className="font-medium">{districtInfo.barren.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Urbanization</h3>
          <div className="text-sm">
            <span className="text-muted-foreground">Urban Extent:</span>
            <p className="font-medium">{districtInfo.urbanExtent.toFixed(1)}%</p>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Environment & Air Quality</h3>
          <div className="text-sm">
            <span className="text-muted-foreground">PM2.5:</span>
            <p className="font-medium">{districtInfo.pm25.toFixed(1)} µg/m³</p>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Elevation (meters)</h3>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Mean:</span>
              <p className="font-medium">{districtInfo.meanElevation.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Min:</span>
              <p className="font-medium">{districtInfo.minElevation.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Max:</span>
              <p className="font-medium">{districtInfo.maxElevation.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}